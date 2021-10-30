import React, { Component } from "react";
import axios from "axios";

class AddAlbum extends Component {
  state = {
    album: "",
    artist: "",
    albumCover: null,
  };

  fileClickHandleChange = (e) => {
    const currFile = e.target.files[0];
    this.setState({
      albumCover: URL.createObjectURL(currFile),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { album, artist, albumCover } = this.state;
    const newAlbum = {
      id: new Date().getTime().toString(),
      album: album,
      artist: artist,
      albumCover: albumCover,
    };

    const albumList = this.props.onAdd(newAlbum);

    this.setState({
      album: "",
      artist: "",
      albumCover: null,
      albumList: albumList,
    });


    
    const formdata = new FormData();
    formdata.append("image", newAlbum.albumCover);
    formdata.append("albumTitle", newAlbum.album);
    formdata.append("artist", newAlbum.artist);

    let config = {
      Headers: {
        Authorization: "Client-ID ec1da133519fad4",
        Accept: "application/json",
      },
    };




    axios
      .post("https://api.imgur.com/3/image", formdata, config)
      .then((res) => {
        return console.log(res);
      })
      .catch((error) => {
        return console.log("error", error);
      });
  };

  render() {
    return (
      <>
        <div className="form-header">
          <form onSubmit={this.handleSubmit}>
            <h2>Add Album Here</h2>
            <input
              type="text"
              name="album"
              placeholder="Add Title"
              onChange={(e) => this.setState({ album: e.target.value })}
              value={this.state.album}
              required={true}
            />
            <input
              type="text"
              name="artist"
              placeholder="Add Artist Name"
              onChange={(e) => this.setState({ artist: e.target.value })}
              value={this.state.artist}
              required={true}
            />
            <input
              type="file"
              accept="image/*"
              name="albumCover"
              onChange={this.fileClickHandleChange}
              required={true}
            />
            <button className="btn">Upload</button>
          </form>
        </div>
      </>
    );
  }
}
export default AddAlbum;
