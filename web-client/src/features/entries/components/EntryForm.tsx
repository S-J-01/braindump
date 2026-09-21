export const EntryForm = () => {
  return (
    <>
      <form>
        <label>Title</label>
        <input type="text" />
        <label>Enter Tags separated by commas</label>
        <input type="text" />
        <select>
          <option>Link</option>
          <option>Note</option>
        </select>
      </form>
    </>
  );
};
