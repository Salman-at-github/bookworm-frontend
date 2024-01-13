// the some function returns true if any of the elements match the condition
export const isEmpty=(form)=>{
    return Object.keys(form).some((field)=>{
        return form[field].trim().length === 0
    })
}


