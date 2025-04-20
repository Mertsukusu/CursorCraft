"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Global singleton instance
let supabaseClientInstance: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Creates a Supabase client with the provided URL and anon key
 * This client is used for non-authenticated operations
 * Using singleton pattern to avoid multiple client instances
 */
export const createSupabaseClient = () => {
  if (supabaseClientInstance) return supabaseClientInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file."
    );
  }
  
  supabaseClientInstance = createClient<Database>(supabaseUrl, supabaseAnonKey);
  return supabaseClientInstance;
}; 