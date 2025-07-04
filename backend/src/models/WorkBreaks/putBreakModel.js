import supabase from "../../config/supabase.js";

const putBreakModel = async (updateFieldsWorkBreak, idContract) => {
    try{
        console.log("putBreakModel - Fields received:", updateFieldsWorkBreak);
        
        // Verificar se é uma pausa fixa ou flexível pelo tipo
        if (updateFieldsWorkBreak.type === 'fixed') {
            // Filtrar apenas os campos válidos para fixed_breaks
            const fixedFields = {
                break_start: updateFieldsWorkBreak.break_start,
                break_end: updateFieldsWorkBreak.break_end
            };
            
            console.log("Updating fixed_breaks with:", fixedFields);
            
            const {error: fixedError} = await supabase
                .from("fixed_breaks")
                .update(fixedFields)
                .eq("id_contract", idContract);

            if (fixedError) {
                console.error("Error updating fixed_breaks:", fixedError);
                return fixedError;
            }
            
            return null; // Sucesso no fixed_breaks
        }
        
        if (updateFieldsWorkBreak.type === 'flex') {
            // Filtrar apenas os campos válidos para flex_breaks
            const flexFields = {
                duration_minutes: updateFieldsWorkBreak.duration_minutes
            };
            
            console.log("Updating flex_breaks with:", flexFields);
            
            const {error: flexError} = await supabase
                .from("flex_breaks")
                .update(flexFields)
                .eq("id_contract", idContract);

            if (flexError) {
                console.error("Error updating flex_breaks:", flexError);
                return flexError;
            }
            
            return null; // Sucesso no flex_breaks
        }

        // Se não tem tipo definido, tentar identificar pelos campos presentes
        if (updateFieldsWorkBreak.break_start && updateFieldsWorkBreak.break_end) {
            // Parece ser uma pausa fixa
            const fixedFields = {
                break_start: updateFieldsWorkBreak.break_start,
                break_end: updateFieldsWorkBreak.break_end
            };
            
            console.log("Auto-detected fixed break, updating with:", fixedFields);
            
            const {error: fixedError} = await supabase
                .from("fixed_breaks")
                .update(fixedFields)
                .eq("id_contract", idContract);

            if (fixedError) {
                console.error("Error updating fixed_breaks (auto-detected):", fixedError);
                return fixedError;
            }
            
            return null;
        }
        
        if (updateFieldsWorkBreak.duration_minutes) {
            // Parece ser uma pausa flexível
            const flexFields = {
                duration_minutes: updateFieldsWorkBreak.duration_minutes
            };
            
            console.log("Auto-detected flex break, updating with:", flexFields);
            
            const {error: flexError} = await supabase
                .from("flex_breaks")
                .update(flexFields)
                .eq("id_contract", idContract);

            if (flexError) {
                console.error("Error updating flex_breaks (auto-detected):", flexError);
                return flexError;
            }
            
            return null;
        }

        console.error("Could not determine break type from fields:", updateFieldsWorkBreak);
        return { message: "Could not determine break type" };
    }
    catch(err){
        console.error("Exception in putBreakModel:", err);
        return err;
    }
}

export default putBreakModel;