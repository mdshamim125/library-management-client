import { AiFillSound } from "react-icons/ai";

const testimonials = [
  {
    name: "Sarah Ahmed",
    title: "Librarian at Greenfield School",
    review:
      "This library management system has completely streamlined our book tracking process. The UI is clean and intuitive!",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Rakib Hasan",
    title: "Student, CSE Dept.",
    review:
      "I love how easy it is to find books and see my borrow history. Super helpful for busy students!",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Nusrat Jahan",
    title: "Administrator, City Library",
    review:
      "Managing borrowers, books, and summaries has never been this simple. Highly recommend it!",
    image: "https://i.pravatar.cc/100?img=3",
  },
];

const Testimonial = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl flex items-center gap-2 justify-center font-extrabold text-gray-800 dark:text-white mb-6"><AiFillSound /> What People Say</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Hear from users who’ve experienced the ease and efficiency of our Library Management System.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-left"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"{testimonial.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
