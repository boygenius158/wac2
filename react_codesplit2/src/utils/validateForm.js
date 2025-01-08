const validateForm = (data, existing) => {
    console.log("validateForm", data, existing);
  
    if (!data.trim()) {
      return { status: "error", message: "The task cannot be empty." };
    }
  
    const isDuplicate = existing.some(item => item.text.toLowerCase() === data.toLowerCase());
    if (isDuplicate) {
      return { status: "error", message: "Task already exists." };
    }
  
    return { status: "success", message: "Task is valid." };
  };
  
  export default validateForm;
  