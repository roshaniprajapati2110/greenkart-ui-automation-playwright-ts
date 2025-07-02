
export class Log{
 
    static info(message: any)
    {
        console.log(`INFO: ${message}`); 
    }

    static error(message: any) 
    {
    console.error(`ERROR: ${message}`);
    }
}