import React, { useState } from 'react';

import { Preview } from './preview';
import { Editor } from './editor';

const defaultMarkdown = `
# Welcome to my React Markdown Previewer!

# Heading 1
## Subheading 2

**Inline code:** \`<div></div>\`

**Block code:**

\`\`\`

//this is multi-code

function multiply(a, b){
    return a * b
  }

\`\`\`

<br>

**Text bold!**
And there is *italic.*

***Look it... both!***

*~~And now crazy crossing stuff out.~~*


**Links:** [freeCodeCamp](https://www.freecodecamp.com)

<br>


| Header Left            | Header Center   | Header Right   |
| :--------------------- | :-------------: | -------------: |
| This is on the left    | In the middle   | On the right   |
| Row 3                  | Row 3           | Row 3          |
| Column 1               | Column 2        | Column 3       |


<br>

> Quotes!

<br>

**Lists:** 

- Item.
  - Item a level below.
    - Another one.

<br>

1. First item
2. Second item
3. And there is a list

<br>

**Photo:** 

### freeCodeCamp Logo

![Free Code Camp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export const App = () => {
    const [markdown, setMarkdown] = useState(defaultMarkdown);

    const textAreaChangeHandler = e => setMarkdown(e.target.value);

    return (
        <div className="markdown-previewer">
            <Editor text={markdown} onTextChange={textAreaChangeHandler} />
            <Preview text={markdown} />
        </div>
    );
};
