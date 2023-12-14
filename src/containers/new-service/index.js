import React from "react";
import './styles.css'

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { useAuth } from "../../hooks/auth";

import { Loader } from "../../components/loader";
import { LoaderSender } from "../../components/LoaderSender";
import { SelectorInput } from "../../components/inputs/selectorInput";
import { DateInput } from "../../components/inputs/dateInput";
import { TimeInput } from "../../components/inputs/timeInput";
import { TextInput } from "../../components/inputs/textInput";
import { CustomButton } from "../../components/inputs/customButton";

import { customFetch } from "../../utils/api/api";

const opciones = []

opciones.push({
    value: 0,
    description: 'Flete'
})
opciones.push({
    value: 1,
    description: 'Custodia'
})
opciones.push({
    value: 2,
    description: 'Flete y custodia'
})

function NewService() {
    const navigate = useNavigate();
    const { handleExpiration } = useAuth();

    const [contentloading, setContentLoading] = React.useState(true);
    const [isSending, setIsSending] = React.useState(false);
    const [loadingSending, setLoadingSending] = React.useState(true);
    const [sendingError, setSendigError] = React.useState(false);
    const [date, setDate] = React.useState(dayjs().format('YYYY-MM-DD'));
    const [time, setTime] = React.useState(dayjs().format('HH:mm'));
    const [comments, setComments] = React.useState("");
    const [customers, setCustomers] = React.useState([]);
    const [routes, setRoutes] = React.useState([]);
    const [rates, setRates] = React.useState([]);
    const [units, setUnits] = React.useState([]);
    const [service, setService] = React.useState({});

    React.useEffect(() => {
        async function fetchData() {
            let responseCustomer = await customFetch(
                'GET',
                `solicitudes/opciones/clientes`,
                null,
                true,
                handleExpiration
            )
            setCustomers(responseCustomer.data);
            let responseRoutes = await customFetch(
                'GET',
                `solicitudes/opciones/rutas?customer=${responseCustomer.data[0].cliente}`,
                null,
                true,
                handleExpiration
            )
            setRoutes(responseRoutes.data);
            let responseRate = await customFetch(
                'GET',
                `solicitudes/opciones/tarifas?customer=${responseCustomer.data[0].cliente}`,
                null,
                true,
                handleExpiration
            )
            setRates(responseRate.data)
            let responseUnits = await customFetch(
                'GET',
                `solicitudes/opciones/unidades`,
                null,
                true,
                handleExpiration
            )
            setUnits(responseUnits.data)
            setService({
                cliente: responseCustomer.data[0].cliente,
                tipoTarifa: responseRate.data[0].tipoTarifa,
                ruta: responseRoutes.data[0].ruta,
                tipoUnidad: responseUnits.data[0].tipoUnidad,
                fechaServicio: date,
                horaServicio: time,
                comentarios: "'",
                tipoServicio: 0,
                tipoDevolucion: 0
            })
            setContentLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCustomerChange = async (e) => {
        let responseRoutes = await customFetch(
            'GET',
            `solicitudes/opciones/rutas?customer=${e.target.value}`,
            null,
            true,
            handleExpiration
        )
        setRoutes(responseRoutes.data);
        let responseRate = await customFetch(
            'GET',
            `solicitudes/opciones/tarifas?customer=${e.target.value}`,
            null,
            true,
            handleExpiration
        )
        setRates(responseRate.data)
        setService({
            ...service,
            cliente: parseInt(e.target.value),
            ruta: responseRoutes.data[0].ruta,
            tipoTarifa: responseRate.data[0].tipoTarifa
        })
    }

    const handleServiceOptionsChange = (e) => {
        let property = e.target.name;
        let value = e.target.value;

        if (property === 'tipoDevolucion' || property === 'tipoServicio') {
            value = parseInt(value);
        }

        setService({
            ...service,
            [property]: value
        })
    }

    const handleSend = async () => {
        try {
            setIsSending(true)
            let response = await customFetch(
                'POST',
                `solicitudes`,
                service,
                true,
                handleExpiration
            )
            if (response.status === 400) {
                throw new Error(response.message)
            }
            setLoadingSending(false)
        } catch (error) {
            console.error(error)
            setSendigError(true)
            setLoadingSending(false)
        }
    }

    const settingStatusLoader = () => {
        setLoadingSending(true)
        setSendigError(false)
        setIsSending(false)
    }

    if (contentloading) {
        return <Loader />
    } else {
        return (
            <div className="new-service_container">
                <h1 style={{ marginBottom: "0" }}>Nuevo servicio</h1>
                <div className="new-service_input_button_back">
                    <CustomButton type="secondary" value="< regresar" action={() => navigate("/")} />
                </div>
                <div className="new-service_input">
                    <SelectorInput
                        label="cliente"
                        options={customers}
                        keyValue="cliente"
                        description="nombreCorto"
                        action={(e) => handleCustomerChange(e)}
                    />
                    <SelectorInput
                        label="ruta"
                        options={routes}
                        keyValue="ruta"
                        description="descripcion"
                        action={(e) => handleServiceOptionsChange(e)}
                        name="ruta"
                    />
                    <SelectorInput
                        label="tipo tarifa"
                        options={rates}
                        keyValue="tipoTarifa"
                        description="descripcion"
                        action={(e) => handleServiceOptionsChange(e)}
                        name="tipoTarifa"
                    />
                </div>
                <div className="new-service_input">
                    <SelectorInput
                        label="servicio"
                        options={opciones}
                        action={(e) => handleServiceOptionsChange(e)}
                        name="tipoServicio"
                    />
                    <SelectorInput
                        label="tipo unidad"
                        options={units}
                        keyValue="tipoUnidad"
                        description="descripcion"
                        action={(e) => handleServiceOptionsChange(e)}
                        name="tipoUnidad"
                    />
                    <DateInput
                        label="fecha"
                        value={date}
                        setValue={setDate}
                        handler={handleServiceOptionsChange}
                        name="fechaServicio"
                    />
                </div>
                <div className="new-service_input">
                    <TimeInput
                        label="hora"
                        value={time}
                        setValue={setTime}
                        name="horaServicio"
                        handler={handleServiceOptionsChange}
                    />
                    <TextInput
                        value={comments}
                        setValue={setComments}
                        label="comentarios"
                        name="comentarios"
                        handler={handleServiceOptionsChange}
                    />
                </div>
                <div className="new-service_input_button_send">
                    <CustomButton
                        value="enviar"
                        action={handleSend}
                    />
                </div>
                {isSending && <LoaderSender loading={loadingSending} setter={settingStatusLoader} error={sendingError} />}
            </div>
        )
    }
}

export { NewService };