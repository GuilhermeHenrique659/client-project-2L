/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['client-project-4l-production.up.railway.app', 'https://project-4l.onrender.com', 'localhost'],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
