import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zayzollunblsymtchlte.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpheXpvbGx1bmJsc3ltdGNobHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NjM3OTksImV4cCI6MjA4MDIzOTc5OX0.3cS7KiiALrGxsr_Tj-FFNx0advbE0u4HIsqhONbcIOg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);