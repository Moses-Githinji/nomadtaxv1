-- ============================================================================
-- TAX_RECORDS TABLE
-- Quarterly and annual tax tracking
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

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_tax_records_user_id ON tax_records(user_id);
CREATE INDEX idx_tax_records_period ON tax_records(period);
CREATE INDEX idx_tax_records_status ON tax_records(status);
CREATE INDEX idx_tax_records_due_date ON tax_records(due_date);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

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
