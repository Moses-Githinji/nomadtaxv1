-- ============================================================================
-- TANKS TABLE
-- Triple Tank System: TAX, WEALTH, SPEND
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

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_tanks_user_id ON tanks(user_id);
CREATE INDEX idx_tanks_type ON tanks(type);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

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
