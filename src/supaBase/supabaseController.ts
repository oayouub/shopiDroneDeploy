// services/supabaseController.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

//article
export interface Product {
  id: number;
  nom: string;
  prix: number;
  description: string;
  image: string;
  categorie: string;
  stock: number;
}

export enum categorie {
    'Drone',
    'Batterie',
    'Helices',
    'Camera',
    'Telecommande',
    'Electronique',
}

export const fetchAllArticles = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('article').select('*');
  if (error) {
    console.error('Error fetching articles:', error.message);
    return [];
  }
  return data as Product[];
};

export const fetchProductById = async (id: number | string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('article')
    .select('id, nom, prix, description, categorie, stock, image, id_user')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  return data;
};

export const fetchArticlesByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('article')
    .select('*')
    .ilike('categorie', category);
    
  if (error) {
    console.error('Error fetching articles by category:', error.message);
    return [];
  }
  return data as Product[];
};

// end article
