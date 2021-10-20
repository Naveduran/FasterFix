export default function SummitButton() {
    function handleSubmit(e) {
      e.preventDefault();
      console.log('You clicked submit.');
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <button  class="transition font-serif duration-500 ease-in-out bg-buttoncolor hover:bg-buttonclick transform hover:-translate-y-1 hover:scale-110 rounded-lg py-1 px-2">
            Done!
        </button>
      </form>
    );
  }
