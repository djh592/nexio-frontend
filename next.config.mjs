/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: false, /* @note: To prevent duplicated call of useEffect */
    // swcMinify: true,
    experimental: {
        ppr: 'incremental',
    },

    async rewrites() {
        return [{
            source: "/api/:path*",
            // TODO: Change the destination to the actual API URL
            destination: "https://nexio-backend-nexio.app.secoder.net/:path*",
        }];
    }
};

export default nextConfig;
