/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        ppr: 'incremental',
    },

    async rewrites() {
        return [{
            source: "/api/:path*",
            destination: "https://nexio-backend-nexio.app.secoder.net/:path*",
        }];
    }
};

export default nextConfig;
