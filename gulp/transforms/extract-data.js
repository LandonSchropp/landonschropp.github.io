import through from 'through2';

/**
 * Given a stream with mutliple Vinyl objects, this function extracts the data from each object and
 * appends it to the source stream as an array of data objects.
 * @param property The name of the property to which the streams should be appended in the `data`
 * field.
 * @param streams The stream containing the Vinyl objects whose data should be appended.
 */
/**
 * Given a source stream, this plugin extracts all of the data objects on each file in the source
 * stream and appends them as an array to the data on each file in the transformed stream. This is
 * extremely useful when building an index page in a blog, where each file in the source stream is
 * an individual post file.
 * @param property The property on the `data` objects in the transformed files to set.
 * @param sourceStream The stream to extract the data objects from.
 * @return Returns a stream transform object.
 */
export default function extractData(property, sourceStream) {
  return through.obj((file, encoding, callback) => {
    let dataArray = [];

    sourceStream
      .on('data', ({ data }) => dataArray.push(data))
      .on('end', () => {
        file.data = Object.assign({}, file.data, { [property]: dataArray });
        callback(null, file);
      });
  });
}
