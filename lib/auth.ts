// lib/auth.ts (diubah)
export interface UserData {
  id: number;
  username: string;
  role: string;
  partnerId: number;
}

// Fungsi ini sekarang jadi async karena akan melakukan fetch
export const getCurrentUser = async (): Promise<UserData | null> => {
  // Client-side onlyi
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    // Panggil API endpoint /api/auth/me
    // Browser akan OTOMATIS menyertakan httpOnly cookie 'token'
    const response = await fetch('/api/auth/me');
    const responseData = await response.json();
    // console.log(responseData);
    if (!response.ok) {
      // Kalau statusnya 401 atau error lain, berarti user tidak valid
      console.log('Failed to fetch user data, user likely not logged in.');
      return null;
    }

    return responseData.user as UserData;

  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};