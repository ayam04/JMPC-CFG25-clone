import { Button } from '@/components/ui/button';

const SubjectFilter = ({ subjects, selectedSubject, onSubjectChange }) => {
  return (
    <div className="max-w-6xl mx-auto mb-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter by Subject</h2>
      <div className="flex flex-wrap gap-3">
        {subjects.map((subject) => (
          <Button
            key={subject}
            variant={selectedSubject === subject ? "default" : "outline"}
            onClick={() => onSubjectChange(subject)}
            className={`transition-all duration-200 ${
              selectedSubject === subject 
                ? "bg-orange-500 hover:bg-orange-600 text-white" 
                : "border-orange-300 text-orange-600 hover:bg-orange-50"
            }`}
          >
            {subject}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubjectFilter;
