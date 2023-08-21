/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['client-project-4l-production.up.railway.app', 'localhost'],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
