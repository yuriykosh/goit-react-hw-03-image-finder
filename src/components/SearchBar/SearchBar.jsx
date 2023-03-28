import { Component } from "react";

export class SearchBar extends Component {
    state = {
        query: "",
    }

    handleInput = (event) => {
        this.setState({query: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { query } = this.state;

        if (!query) {
            alert('Please enter search value')
            return
        }
        this.props.onSubmit(query);
        this.setState({ query: "" });
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
          <button type="submit">
                Search 
            </button>

          <input
            onChange={this.handleInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
          />
        </form>
        )
    }
}