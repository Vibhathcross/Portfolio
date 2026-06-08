import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isPlaceholder = 
  !supabaseUrl || 
  !supabaseAnonKey || 
  supabaseUrl.includes('your-supabase-project') || 
  supabaseAnonKey.includes('placeholder');

// Seed high-quality project fallbacks for offline running
export const mockProjects = [
  {
    id: '1',
    title: 'Jasmin - Custom AI Assistant',
    description: 'A highly modular, localized Python/React orchestrator integrating advanced LLM reasoning, local vector search memory databases, and real-time audio pipeline streaming.',
    tech_stack: ['Python', 'React', 'FastAPI', 'Tailwind', 'VectorDB'],
    github_link: 'https://github.com/vibhath/jasmin-ai',
    live_link: null,
    image_url: null,
  },
  {
    id: '2',
    title: 'Secure Access Gateway',
    description: 'Enterprise-grade microservice gateway designed with low-overhead C routing engines, JWT/OAuth validation proxies, and dynamic database pooling APIs.',
    tech_stack: ['C', 'PostgreSQL', 'Docker', 'Redis', 'Cryptography'],
    github_link: 'https://github.com/vibhath/secure-gateway',
    live_link: null,
    image_url: null,
  },
  {
    id: '3',
    title: 'AI Data Clustering Engine',
    description: 'High-performance clustering platform analyzing high-dimensional neural network embedding spaces using custom K-Means & DBScan implementations.',
    tech_stack: ['Python', 'Next.js', 'PyTorch', 'Data Science', 'Tailwind'],
    github_link: 'https://github.com/vibhath/clustering-engine',
    live_link: null,
    image_url: null,
  }
];

let supabaseClient = null;

if (!isPlaceholder) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn("Failed to initialize Supabase client, using mock fallbacks:", error);
  }
}

// Custom chainable wrapper to intercept database calls in mockup mode
export const supabase = {
  from: (table) => {
    if (isPlaceholder || !supabaseClient) {
      return {
        select: (columns) => ({
          order: (column, { ascending } = {}) => ({
            then: (resolve) => {
              if (table === 'projects') {
                resolve({ data: mockProjects, error: null });
              } else {
                resolve({ data: [], error: null });
              }
              return Promise.resolve({ data: mockProjects, error: null });
            }
          }),
          then: (resolve) => {
            if (table === 'projects') {
              resolve({ data: mockProjects, error: null });
            } else {
              resolve({ data: [], error: null });
            }
            return Promise.resolve({ data: mockProjects, error: null });
          }
        }),
        insert: (data) => ({
          then: (resolve) => {
            console.log(`[Supabase Mock] Message successfully saved to local console:\n`, data);
            resolve({ data: [data], error: null });
            return Promise.resolve({ data: [data], error: null });
          }
        })
      };
    }

    return supabaseClient.from(table);
  }
};
export default supabase;
