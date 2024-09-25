import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.post('/process-video', (req, res) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send('Missing input or output file path');   
    }

    ffmpeg(inputFilePath)
        .outputOptions("-vf","scale=-1:360") // Resize to 360p resolution
        .on('end', () => {
            res.status(200).send('Video processing started');
        }) // Do something when processing is done
        .on('error', (err) => {
            console.error(err);
            res.status(500).send('Error processing video');
        }) // Do something when processing errors occurs
        .save(outputFilePath); // Save the output file to the specified path

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Video processing at http://localhost:${port}`);
});
