import React from 'react';
import toast from 'react-hot-toast';

const TaskAssignModal = ({ isOpen, onClose, department, tasks, selectedTasks, onTaskSelection, onTaskAssignment }) => {
  if (!isOpen) return null;

  const handleTaskAssignment = () => {
    onTaskAssignment(department?.id);
    toast.success("Tasks assigned successfully!");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Assign Tasks for {department?.name}
        </h2>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={() => onTaskSelection(task.id)}
                className="w-5 h-5"
              />
              <span className="text-gray-800">{task.name}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:cursor-pointer hover:bg-gray-400">Close</button>
          <button
            onClick={handleTaskAssignment}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:cursor-pointer hover:bg-blue-700"
          >
            Assign Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignModal;
