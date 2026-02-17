import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client for build-time / static generation contexts
 * where cookies() is not available (e.g., generateStaticParams).
 * Uses the anon key with public RLS policies.
 */
export function createStaticSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
