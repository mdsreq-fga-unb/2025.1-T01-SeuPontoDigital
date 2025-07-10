import supabase from "../../config/supabase.js";

const putBreakModel = async (updateFieldsWorkBreak, idContract) => {
    try{
        console.log("putBreakModel - Fields received:", JSON.stringify(updateFieldsWorkBreak, null, 2));
        
        // Verificar se é uma pausa fixa ou flexível pelo tipo
        if (updateFieldsWorkBreak.type === 'fixed') {
            // Filtrar apenas os campos válidos para fixed_breaks
            const fixedFields = {
                break_start: updateFieldsWorkBreak.break_start,
                break_end: updateFieldsWorkBreak.break_end
            };
            
            console.log("Updating fixed_breaks with:", JSON.stringify(fixedFields, null, 2));
            
            // Verificar se já existe um registro fixed_breaks para este contrato
            const {data: existingFixed} = await supabase
                .from("fixed_breaks")
                .select("id")
                .eq("id_contract", idContract)
                .single();
            
            let fixedError;
            if (existingFixed) {
                // Se existe, fazer update
                const {error} = await supabase
                    .from("fixed_breaks")
                    .update(fixedFields)
                    .eq("id_contract", idContract);
                fixedError = error;
            } else {
                // Se não existe, fazer insert
                const {error} = await supabase
                    .from("fixed_breaks")
                    .insert({
                        id_contract: idContract,
                        ...fixedFields
                    });
                fixedError = error;
            }

            if (fixedError) {
                console.error("Error updating/inserting fixed_breaks:", fixedError);
                return fixedError;
            }
            
            // Limpar/deletar flex_breaks quando usar fixed
            const {error: clearFlexError} = await supabase
                .from("flex_breaks")
                .delete()
                .eq("id_contract", idContract);

            if (clearFlexError) {
                console.error("Error clearing flex_breaks:", clearFlexError);
                // Não retorna erro, pois é uma limpeza auxiliar
            }
            
            return null; // Sucesso no fixed_breaks
        }
        
        if (updateFieldsWorkBreak.type === 'flex') {
            // Filtrar apenas os campos válidos para flex_breaks
            const flexFields = {
                duration_minutes: updateFieldsWorkBreak.duration_minutes
            };
            
            console.log("Updating flex_breaks with:", JSON.stringify(flexFields, null, 2));
            
            // Verificar se já existe um registro flex_breaks para este contrato
            const {data: existingFlex} = await supabase
                .from("flex_breaks")
                .select("id")
                .eq("id_contract", idContract)
                .single();
            
            let flexError;
            if (existingFlex) {
                // Se existe, fazer update
                const {error} = await supabase
                    .from("flex_breaks")
                    .update(flexFields)
                    .eq("id_contract", idContract);
                flexError = error;
            } else {
                // Se não existe, fazer insert
                const {error} = await supabase
                    .from("flex_breaks")
                    .insert({
                        id_contract: idContract,
                        ...flexFields
                    });
                flexError = error;
            }

            if (flexError) {
                console.error("Error updating/inserting flex_breaks:", flexError);
                return flexError;
            }
            
            // Limpar/deletar fixed_breaks quando usar flex
            const {error: clearFixedError} = await supabase
                .from("fixed_breaks")
                .delete()
                .eq("id_contract", idContract);

            if (clearFixedError) {
                console.error("Error clearing fixed_breaks:", clearFixedError);
                // Não retorna erro, pois é uma limpeza auxiliar
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
            
            console.log("Auto-detected fixed break, updating with:", JSON.stringify(fixedFields, null, 2));
            
            // Verificar se já existe um registro fixed_breaks para este contrato
            const {data: existingFixed} = await supabase
                .from("fixed_breaks")
                .select("id")
                .eq("id_contract", idContract)
                .single();
            
            let fixedError;
            if (existingFixed) {
                // Se existe, fazer update
                const {error} = await supabase
                    .from("fixed_breaks")
                    .update(fixedFields)
                    .eq("id_contract", idContract);
                fixedError = error;
            } else {
                // Se não existe, fazer insert
                const {error} = await supabase
                    .from("fixed_breaks")
                    .insert({
                        id_contract: idContract,
                        ...fixedFields
                    });
                fixedError = error;
            }

            if (fixedError) {
                console.error("Error updating/inserting fixed_breaks (auto-detected):", fixedError);
                return fixedError;
            }
            
            // Limpar/deletar flex_breaks quando usar fixed (auto-detecção)
            const {error: clearFlexError} = await supabase
                .from("flex_breaks")
                .delete()
                .eq("id_contract", idContract);

            if (clearFlexError) {
                console.error("Error clearing flex_breaks (auto-detected):", clearFlexError);
            }
            
            return null;
        }
        
        if (updateFieldsWorkBreak.duration_minutes) {
            // Parece ser uma pausa flexível
            const flexFields = {
                duration_minutes: updateFieldsWorkBreak.duration_minutes
            };
            
            console.log("Auto-detected flex break, updating with:", JSON.stringify(flexFields, null, 2));
            
            // Verificar se já existe um registro flex_breaks para este contrato
            const {data: existingFlex} = await supabase
                .from("flex_breaks")
                .select("id")
                .eq("id_contract", idContract)
                .single();
            
            let flexError;
            if (existingFlex) {
                // Se existe, fazer update
                const {error} = await supabase
                    .from("flex_breaks")
                    .update(flexFields)
                    .eq("id_contract", idContract);
                flexError = error;
            } else {
                // Se não existe, fazer insert
                const {error} = await supabase
                    .from("flex_breaks")
                    .insert({
                        id_contract: idContract,
                        ...flexFields
                    });
                flexError = error;
            }

            if (flexError) {
                console.error("Error updating/inserting flex_breaks (auto-detected):", flexError);
                return flexError;
            }
            
            // Limpar/deletar fixed_breaks quando usar flex (auto-detecção)
            const {error: clearFixedError} = await supabase
                .from("fixed_breaks")
                .delete()
                .eq("id_contract", idContract);

            if (clearFixedError) {
                console.error("Error clearing fixed_breaks (auto-detected):", clearFixedError);
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