-- ============================================================================
-- SETTINGS TABLE
-- User preferences and configuration
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

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_settings_user_id ON settings(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

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
