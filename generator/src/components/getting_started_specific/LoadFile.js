import React from 'react'

//TODO: Complete functions for uploading files 
export default function LoadFile() {
    return (
        <div class="row">
            <div class="card card-body load-panel m-2">
                <div class="card card-body load-panel m-2 collapse show">
                    <div>
                        <h3>Select configuration Zip file</h3>
                    </div>
                    <form enctype="multipart/form-data">
                        <input type="file" name="file" savebutton="jsonConfigSave" class="form-control" required="" id="id_file" />
                        <button type="submit" class="btn btn-primary m-2" id="upload-button">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    )
}