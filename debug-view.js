import React from "react";
import { View, StyleSheet } from "react-native";
import DebugListView from "./debug-list-view.js";
import debugService from "./debug-service";
import debounce from "debounce";

export default class DebugView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.unmounted = false;
    this.updateDebounced = debounce(this.update.bind(this), 150);
    this.DebugService = props.DebugService;
  }

  componentWillUnmount() {
    this.unmounted = true;
    if (this.listner) {
      this.listner();
    }
  }

  update(data) {
    if (data) {
      if (!this.unmounted) {
        this.setState({ rows: data });
      }
    }
  }

  componentDidMount() {
    this.listner = this.DebugService.onDebugRowsChanged(this.updateDebounced);
  }

  render() {
    return (
      <View style={styles.container}>
        <DebugListView rows={this.state.rows} {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
