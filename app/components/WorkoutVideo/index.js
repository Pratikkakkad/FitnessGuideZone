import React, { Component } from "react";
import { Platform, StyleSheet, Text,Button, View } from "react-native";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-player";

const VIMEO_ID = "179859217";

export default class WorkoutVideo extends Component {
  constructor() {
    super();

    this.state = {
      video: { width: undefined, height: undefined, duration: undefined },
      thumbnailUrl: undefined,
      videoUrl: undefined
    };
  }

  componentDidMount() {
    global
      .fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          thumbnailUrl: res.video.thumbs["640"],
          videoUrl:
            res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
          video: res.video
        })
      );
  }

  render() {
    return (
      <View>
        <Text style={{ backgroundColor: "#FFA726" }}>
        </Text>
        <VideoPlayer
          video={{ uri: './gif/giphy.gif' }}

          duration={
            this.state.video
              .duration /* I'm using a hls stream here, react-native-video
            can't figure out the length, so I pass it here from the vimeo config */
          }
          ref={r => (this.player = r)}
        />
        {/* <Button onPress={() => this.player.stop()} title="Stop" />
        <Button onPress={() => this.player.pause()} title="Pause" />
        <Button onPress={() => this.player.resume()} title="Resume" /> */}
      <Text style={{ backgroundColor: "#FFA726" }}></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
