-- ============================================================================
-- TANK_ALLOCATIONS TABLE
-- Links transactions to tank distributions
-- ============================================================================

CREATE TABLE tank_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions ON DELETE CASCADE,
    tank_id UUID NOT NULL REFERENCES tanks ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_tank_allocations_transaction ON tank_allocations(transaction_id);
CREATE INDEX idx_tank_allocations_tank ON tank_allocations(tank_id);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

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
