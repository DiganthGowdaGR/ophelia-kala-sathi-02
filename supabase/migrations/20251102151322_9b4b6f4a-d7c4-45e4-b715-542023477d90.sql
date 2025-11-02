-- Add seller role to the enum
ALTER TYPE public.app_role ADD VALUE 'seller';

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role 
  FROM public.user_roles 
  WHERE user_roles.user_id = $1 
  LIMIT 1
$$;