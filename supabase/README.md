# Supabase Migration Instructions

## How to Apply the Database Schema

The schema is split into 8 separate migration files for easier management:

1. `01_profiles.sql` - User profiles table
2. `02_tanks.sql` - Triple Tank system
3. `03_transactions.sql` - Financial transactions
4. `04_tank_allocations.sql` - Transaction-to-tank mapping
5. `05_tax_records.sql` - Tax tracking
6. `06_invoices.sql` - eTIMS invoices
7. `07_settings.sql` - User settings
8. `08_triggers.sql` - Auto-update triggers and defaults

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. For each file (in order 01-08):
   - Click **New Query**
   - Copy the file contents
   - Paste into the SQL editor
   - Click **Run** to execute
   - Wait for success before moving to next file

### Option 2: All at Once

You can also run all migrations at once by copying and pasting all 8 files in sequence into a single SQL query.

### Option 3: Using Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Apply all migrations
supabase db push
```

## Migration Order (IMPORTANT)

The files must be run in numerical order (01 through 08) due to dependencies:
- Tables must exist before setting up allocations
- Triggers depend on all tables being created first

## What This Migration Creates

### Tables (7)
1. **profiles** - Extended user information
2. **tanks** - Triple Tank allocations (Tax, Wealth, Spend)
3. **transactions** - Income and expense records
4. **tank_allocations** - Links transactions to tanks
5. **tax_records** - Quarterly/annual tax tracking
6. **invoices** - eTIMS invoice management
7. **settings** - User preferences

### Security Features
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Users can only access their own data
- ✅ Policies for SELECT, INSERT, UPDATE, DELETE operations

### Automatic Features
- ✅ Auto-generates 3 default tanks when user signs up
- ✅ Auto-creates default settings for new users
- ✅ Auto-updates `updated_at` timestamps

## Verify Migration Success

After running all migrations, verify by running this query:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see all 7 tables listed.

## Next Steps

After successfully applying the migrations:
1. Test user signup - should auto-create tanks and settings
2. Verify RLS policies by trying to access data as different users
3. Update frontend code to interact with these tables
