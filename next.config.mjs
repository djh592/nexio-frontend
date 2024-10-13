/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: false, /* @note: To prevent duplicated call of useEffect */
    swcMinify: true,

    async rewrites() {
        return [{
            source: "/api/:path*",
            // TODO: Change the destination to the actual API URL
            destination: "http://127.0.0.1:8000/:path*",
        }];
    }
};

export default nextConfig;
