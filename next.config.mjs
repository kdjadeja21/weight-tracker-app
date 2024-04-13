/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 'avatar.vercel.sh'
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos'
        }
      ],
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  };
  
export default nextConfig;
