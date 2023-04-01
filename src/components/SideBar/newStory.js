import { useState } from "react";

export default function NewStory() {
  const defaultPages = [
    {
      "type": "TEXT",
      "content": ""
    }
  ]
  const [pages, setPages] = useState(defaultPages)

  function renderPages() {
    return pages.map(page =>
    <>
    <input type="text" id="pages" name="pages" />
    <select>
      <option value="TEXT">Text</option>
      <option value="IMGE">Image</option>
    </select>
    </>)
  }

  function handleClick() {
    setPages(current => [...current, {
      "type": "TEXT",
      "content": ""
    }])
  }

  return(
    <>
      <form action="/action_page.php" method="get">
        <label for="aname">Author:</label>
        <input type="text" id="aname" name="aname" />
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label for="title">Date:</label>
        <input type="text" id="date" name="date" />
        <label for="title">Location:</label>
        <input type="text" id="location" name="location" />
        <label for="title">Pages:</label>
        <input type="text" id="pages" name="pages" />
        <div>{renderPages()}</div>
        <button onClick={handleClick}>Add page</button>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
}
