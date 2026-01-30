import { createClient } from "redis";
import "dotenv/config";

const client = await createClient({
    url: process.env.REDIS_URL!
});

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

export default client
