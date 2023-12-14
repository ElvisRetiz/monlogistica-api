import React from "react";
import './styles.css'

import { useAuth } from "../../hooks/auth";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { customFetch } from "../../utils/api/api";

import { DateInput } from "../../components/inputs/dateInput";
import { CustomTable } from "../../components/customTable";
import { TableLoader } from "../../components/tableLoader";
import { CustomRow } from "../../components/customRow";
import { SelectorInput } from "../../components/inputs/selectorInput";
import { CustomButton } from "../../components/inputs/customButton";
import { Modal } from "../../components/modal";
import { Loader } from "../../components/loader";

function Services() {
    const { handleExpiration } = useAuth();
    const navigate = useNavigate();

    const [contentloading, setContentLoading] = React.useState(true);
    const [servicesLoading, setServicesLoading] = React.useState(true);
    const [minValue, setMinValue] = React.useState(dayjs().format("YYYY-MM-DD"));
    const [maxValue, setMaxValue] = React.useState(dayjs().format("YYYY-MM-DD"));
    const [status, setStatus] = React.useState(0);
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [consultedService, setConsultedService] = React.useState("0");
    const [services, setServices] = React.useState([]);

    const opciones = [];

    opciones.push({
        value: 0,
        description: "Nuevo"
    })
    opciones.push({
        value: 1,
        description: "En proceso"
    })
    opciones.push({
        value: 2,
        description: "Terminado"
    })
    opciones.push({
        value: 3,
        description: "Cancelado"
    })

    React.useEffect(() => {
        async function fetchData() {
            setServicesLoading(true);
            let initialDate = dayjs(minValue).format("MM/DD/YYYY");
            let finalDate = dayjs(maxValue).format("MM/DD/YYYY");
            let response = await customFetch(
                'GET',
                `solicitudes?status=${status}&initialDate=${initialDate}&finalDate=${finalDate}`,
                null,
                true,
                handleExpiration
            )
            setServices(response.data);
            setContentLoading(false);
            setServicesLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleRefresh() {
        try {
            setServicesLoading(true)
            let initialDate = dayjs(minValue).format("MM/DD/YYYY");
            let finalDate = dayjs(maxValue).format("MM/DD/YYYY");
            let response = await customFetch(
                'GET',
                `solicitudes?status=${status}&initialDate=${initialDate}&finalDate=${finalDate}`,
                null,
                true,
                handleExpiration
            )
            setServices(response.data);
            setServicesLoading(false);

        } catch (error) {
            setServicesLoading(false)
        }
    }

    async function handleModal(serviceNumber) {
        try {
            setVisible(true);
            setLoading(true);
            let response = await customFetch(
                'GET',
                `solicitudes/${serviceNumber}`,
                null,
                sessionStorage.getItem('token')
            )
            if (response.status === 401) {
                response = await customFetch(
                    'GET',
                    `solicitudes/${serviceNumber}`,
                    null,
                    sessionStorage.getItem('refreshToken')
                )
            }
            if (response.status === 401) {
                handleExpiration();
            }
            setConsultedService(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false)
            alert(error.message)
        }
    }

    const handleSelect = (e) => {
        setStatus(e.target.value)
    }

    if (contentloading) {
        return <Loader />
    } else {
        return (
            <div style={{ width: "80%", margin: "auto" }}>
                <h1 style={{ marginTop: "5rem", marginBottom: "0.5rem" }}>Servicios</h1>
                <div className="services_filter_container">
                    <div className="services_filter_container_inputs">
                        <DateInput
                            label="fecha inicial"
                            value={minValue}
                            setValue={setMinValue}
                            max={maxValue}
                        />
                        <DateInput
                            label="fecha final"
                            value={maxValue}
                            setValue={setMaxValue}
                            min={minValue}
                        />
                        <SelectorInput
                            label="estatus"
                            options={opciones}
                            value={status}
                            action={handleSelect}
                        />
                        <CustomButton
                            value={<label className="services_filter_container_inputs_button_container"><i className='bx bx-refresh service-refresh_icon'></i> refrescar</label>}
                            type="secondary"
                            action={handleRefresh}
                            customClasses="services_filter_container_inputs_button"
                        />
                    </div>
                    <div>
                        <CustomButton
                            value={<label className="services_filter_container_inputs_button_container"><i className='bx bxs-plus-square new-service_icon'></i>nuevo servicio</label>}
                            action={() => navigate("/servicio")}
                            customClasses="new-service_button"
                        />
                    </div>
                </div>
                <div className="services_container">
                    <CustomTable>
                        {
                            servicesLoading &&
                            <TableLoader />
                        }
                        {
                            (services.length === 0 && !servicesLoading) &&
                            <tr style={{ position: 'fixed' }}>
                                <td>
                                    <p><i>*No se encontraron servicios con los parametros seleccionados*</i></p>
                                </td>
                            </tr>
                        }
                        {
                            (!servicesLoading && services.length > 0) &&
                            services.map(
                                (service) => (<CustomRow action={() => handleModal(service.servicio)} key={service.servicio} element={service} />)
                            )
                        }
                    </CustomTable>
                </div>
                <Modal visible={visible} loading={loading} setVisible={setVisible} data={consultedService} />
            </div>
        )
    }
}

export { Services }