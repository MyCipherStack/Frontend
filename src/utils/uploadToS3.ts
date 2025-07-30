

import {ObjectCannedACL, PutObjectAclCommand, S3Client} from "@aws-sdk/client-s3"




const s3 =new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY!,
        secretAccessKey:process.env.ACCESS_KEY!
    }
})



export const uploadToS3=async(file:File):Promise<string>=>{
    const fileName=`${Date.now()}-${file.name}}` ;
    const bucketName="cipherstack"

    const params={
        Bucket:bucketName,
        Key:`avatars/${fileName}`,
        Body:file,
        ContentType:file.type,
        ACL:"public-read" as ObjectCannedACL
        

    }

    const command=new PutObjectAclCommand(params);
    await s3.send(command)

    return `https://${bucketName}.s3.amazonaws.com/avatars/${fileName}`
}