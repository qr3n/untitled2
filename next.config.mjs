/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/admin',
                destination: '/admin/marketplace',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
