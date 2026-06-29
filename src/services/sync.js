import { supabase } from "./supabase";
import {
  getSongs,
  saveSongs,
  getConfig,
  saveConfig,
} from "./database";

export async function sincronizarCanciones() {
  // Si no hay internet, no intentar sincronizar
  if (!navigator.onLine) {
    return;
  }

  try {
    // Configuración guardada localmente
    const configLocal =
      (await getConfig()) || {
        id: 1,
        ultima_actualizacion: null,
      };

    // Configuración del servidor
    const { data: configServidor, error: errorConfig } =
      await supabase
        .from("app_config")
        .select("*")
        .eq("id", 1)
        .single();

    if (errorConfig) throw errorConfig;

    // Si no hubo cambios, salir
    if (
      configLocal.ultima_actualizacion ===
      configServidor.ultima_actualizacion
    ) {
      return;
    }

    let cancionesActualizadas = [];

    // Primera sincronización
    if (!configLocal.ultima_actualizacion) {
      const { data, error } = await supabase
        .from("songs")
        .select("*");

      if (error) throw error;

      cancionesActualizadas = data;
    } else {
      // Solo canciones modificadas
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .gt(
          "updated_at",
          configLocal.ultima_actualizacion
        );

      if (error) throw error;

      cancionesActualizadas = data;
    }

    // Guardar únicamente las nuevas o modificadas
    if (cancionesActualizadas.length > 0) {
      await saveSongs(cancionesActualizadas);
    }

    // Guardar fecha de última sincronización
    await saveConfig({
      ultima_actualizacion:
        configServidor.ultima_actualizacion,
    });

    console.log("✔ Sincronización completada");
  } catch (error) {
    console.error("Error sincronizando:", error);
  }
}