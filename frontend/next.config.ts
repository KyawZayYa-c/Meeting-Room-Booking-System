// @ts-ignore
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: {

        removeConsole: {
            exclude: ['error'],
        },
    },

    reactStrictMode: true,

    // Image optimization settings
    images: {
        domains: [],
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: '**',
        //     },
        // ],
    },

    //  optional configs
    // experimental: {
    //     appDir: true,
    // },
};

export default nextConfig;