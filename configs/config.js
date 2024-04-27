import main from 'dotenv'

main.config();

export const  CONN_STRX = process.env.CONN_STRX
export const  DEV_CONN_STRX = process.env.DEV_CONN_STRX

export const ENV_TYPE = "Development"