import React , {useState} from 'react';
import S3 from 'react-aws-s3';

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

// a React functional component, used to create a simple upload input and button

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState([]);

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    }

    const handleFileInput = (e) => {
      const currentFiles = selectedFile
      currentFiles.push(e.target.files[0])
      setSelectedFile(currentFiles);
    }

    const uploadFile = async (files) => {
        files.forEach((file) => {
          const ReactS3Client = new S3(config);
          // the name of the file uploaded is used to upload it to S3
          ReactS3Client
          .uploadFile(file, file.fileName)
          .then(data => console.log(data.location))
          .catch(err => console.error(err))
        });
    }
    return <div>
        <div>React S3 File Upload</div>
        {/* You can restrict image type by ading image/jpeg, image/png */}
        {/* Pease limit file size */}
        <input type="file" onChange={handleFileInput} accept="image/*, .pdf, .doc, .mp4" multiple />
        {/* <input type="file" onChange={handleFileInput} accept="video/*, .pdf, .doc" /> */}
        <br></br>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default Upload;

// We need to validate the file inputs for size
// We might limit the file types
// For video only videos
// For documents maybe doc, docx and pdf
// For images maybe only jpg and png
// We receive only one video for video and one thumbnail for thumbnail
// For  additional materials we can receive a max of two documents only
//  and some links to other extra resources
// We follow a standard for naming files on s3 
// for example course-lessonname. The name we receive from users is only
// we wish to display the name of a file for example the list of additional
// materials could be a link text of the chosen file name.
// I think we should have comments inside lessons for questions and answers