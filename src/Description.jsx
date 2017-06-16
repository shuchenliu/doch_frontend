import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';

/*
Profile component displays twitter Profile.
1, Image
2, ScreenName
3, ID
4, banner => maybe another component

*/


class Description extends Component {

  constructor(props) {
    super(props);
    this.breakParagraph = this.breakParagraph.bind(this);
  }

  breakParagraph(text) {
    var textArray = text.split(' ');
    var displayText = text;
    if (textArray.length > 10) {
      var firstPart = textArray.slice(0,10);
      var secondPart = textArray.slice(10);
      var firstParagraph = firstPart.join(' ');
      var secondParagraph = secondPart.join(' ');
      displayText = (
        <div>
          <p>{firstParagraph}</p>
          <p>{secondParagraph}</p>
        </div>
      );
    }

    return displayText;
  }


  render() {
    return (

          <Container className=' Divider Description-text'>
            {this.props.description}
          </Container>

    )
  }
}

export default Description;
