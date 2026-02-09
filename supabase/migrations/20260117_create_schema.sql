-- NomadTax Database Schema Migration
-- Created: 2026-01-17
-- Description: Complete database schema for NomadTax application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PROFILES TABLE
-- ============================================================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT,
    business_name TEXT,
    tax_id TEXT, -- KRA PIN
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_profiles_tax_id ON profiles(tax_id);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- ============================================================================
-- 2. TANKS TABLE
-- ============================================================================
CREATE TABLE tanks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('TAX', 'WEALTH', 'SPEND')),
    balance DECIMAL(12,2) DEFAULT 0 CHECK (balance >= 0),
    target_percentage INTEGER DEFAULT 0 CHECK (target_percentage >= 0 AND target_percentage <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, type)
);

-- Indexes
CREATE INDEX idx_tanks_user_id ON tanks(user_id);
CREATE INDEX idx_tanks_type ON tanks(type);

-- RLS Policies
ALTER TABLE tanks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tanks"
    ON tanks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tanks"
    ON tanks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tanks"
    ON tanks FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tanks"
    ON tanks FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- 3. TRANSACTIONS TABLE
-- ============================================================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    type TEXT NOT NULL CHECK (type IN ('INCOME', 'EXPENSE')),
    category TEXT,
    description TEXT,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX idx_transactions_type ON transactions(type);

-- RLS Policies
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
    ON transactions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
    ON transactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions"
    ON transactions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions"
    ON transactions FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- 4. TANK_ALLOCATIONS TABLE
-- ============================================================================
CREATE TABLE tank_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions ON DELETE CASCADE,
    tank_id UUID NOT NULL REFERENCES tanks ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tank_allocations_transaction ON tank_allocations(transaction_id);
CREATE INDEX idx_tank_allocations_tank ON tank_allocations(tank_id);

-- RLS Policies
ALTER TABLE tank_allocations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tank allocations"
    ON tank_allocations FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM transactions t
            WHERE t.id = tank_allocations.transaction_id
            AND t.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own tank allocations"
    ON tank_allocations FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM transactions t
            WHERE t.id = tank_allocations.transaction_id
            AND t.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own tank allocations"
    ON tank_allocations FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM transactions t
            WHERE t.id = tank_allocations.transaction_id
            AND t.user_id = auth.uid()
        )
    );

-- ============================================================================
-- 5. TAX_RECORDS TABLE
-- ============================================================================
CREATE TABLE tax_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    period TEXT NOT NULL, -- e.g., '2024-Q1', '2024'
    period_type TEXT NOT NULL CHECK (period_type IN ('QUARTERLY', 'ANNUAL')),
    gross_income DECIMAL(12,2) DEFAULT 0,
    taxable_income DECIMAL(12,2) DEFAULT 0,
    tax_calculated DECIMAL(12,2) DEFAULT 0,
    tax_paid DECIMAL(12,2) DEFAULT 0,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'OVERDUE')),
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, period)
);

-- Indexes
CREATE INDEX idx_tax_records_user_id ON tax_records(user_id);
CREATE INDEX idx_tax_records_period ON tax_records(period);
CREATE INDEX idx_tax_records_status ON tax_records(status);
CREATE INDEX idx_tax_records_due_date ON tax_records(due_date);

-- RLS Policies
ALTER TABLE tax_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tax records"
    ON tax_records FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tax records"
    ON tax_records FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tax records"
    ON tax_records FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tax records"
    ON tax_records FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- 6. INVOICES TABLE
-- ============================================================================
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    invoice_number TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_pin TEXT,
    amount DECIMAL(12,2) NOT NULL CHECK (amount >= 0),
    tax_amount DECIMAL(12,2) DEFAULT 0 CHECK (tax_amount >= 0),
    total_amount DECIMAL(12,2) NOT NULL CHECK (total_amount >= 0),
    issue_date DATE DEFAULT CURRENT_DATE,
    etims_status TEXT DEFAULT 'PENDING' CHECK (etims_status IN ('PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED')),
    etims_control_number TEXT,
    qr_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, invoice_number)
);

-- Indexes
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_status ON invoices(etims_status);
CREATE INDEX idx_invoices_date ON invoices(issue_date DESC);

-- RLS Policies
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own invoices"
    ON invoices FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own invoices"
    ON invoices FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invoices"
    ON invoices FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own invoices"
    ON invoices FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- 7. SETTINGS TABLE
-- ============================================================================
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE UNIQUE,
    currency TEXT DEFAULT 'KES',
    tax_rate DECIMAL(5,2) DEFAULT 30.00 CHECK (tax_rate >= 0 AND tax_rate <= 100),
    notification_enabled BOOLEAN DEFAULT TRUE,
    tax_reminder_days INTEGER DEFAULT 7 CHECK (tax_reminder_days >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_settings_user_id ON settings(user_id);

-- RLS Policies
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings"
    ON settings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
    ON settings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
    ON settings FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tanks_updated_at BEFORE UPDATE ON tanks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tax_records_updated_at BEFORE UPDATE ON tax_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- HELPER FUNCTION: Initialize default tanks for new users
-- ============================================================================

CREATE OR REPLACE FUNCTION initialize_user_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- Create default tanks
    INSERT INTO tanks (user_id, type, balance, target_percentage) VALUES
        (NEW.id, 'TAX', 0, 30),
        (NEW.id, 'WEALTH', 0, 20),
        (NEW.id, 'SPEND', 0, 50);
    
    -- Create default settings
    INSERT INTO settings (user_id) VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to initialize defaults when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION initialize_user_defaults();

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
