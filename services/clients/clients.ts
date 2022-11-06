const serveCustomer = async (): Promise<{
  message: string;
  ok: boolean;
}> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      message: "Falló la conexión con el servidor",
      ok: false,
    };
  }
};

export { serveCustomer };
