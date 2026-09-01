<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2">

    <!-- ENCABEZADO -->
    <q-header elevated class="bg-primary">
      <q-toolbar>

        <q-avatar color="white" text-color="primary">
          🔧
        </q-avatar>

        <q-toolbar-title>
          Servicio Técnico Don Efraín
          <div class="text-caption">
            Gestión de celulares y tablets
          </div>
        </q-toolbar-title>

        <q-btn
          color="white"
          text-color="primary"
          icon="add"
          label="Nuevo servicio"
          @click="nuevoServicio"
        />

      </q-toolbar>
    </q-header>

    <!-- CONTENIDO -->
    <q-page-container>
      <q-page class="q-pa-md">

        <!-- RESUMEN -->
        <div class="row q-col-gutter-md q-mb-lg">

          <div class="col-12 col-sm-4">
            <q-card class="dashboard-card bg-blue-1">
              <q-card-section>
                <div class="text-subtitle2 text-grey-8">
                  Total de servicios
                </div>

                <div class="text-h4 text-primary">
                  {{ servicios.length }}
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-4">
            <q-card class="dashboard-card bg-orange-1">
              <q-card-section>
                <div class="text-subtitle2 text-grey-8">
                  Pendientes de entrega
                </div>

                <div class="text-h4 text-orange-9">
                  {{ contarPendientes() }}
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-4">
            <q-card class="dashboard-card bg-green-1">
              <q-card-section>
                <div class="text-subtitle2 text-grey-8">
                  Pagados
                </div>

                <div class="text-h4 text-green-9">
                  {{ contarPagados() }}
                </div>
              </q-card-section>
            </q-card>
          </div>

        </div>

        <!-- TITULO -->
        <div class="row items-center justify-between q-mb-md">

          <div>
            <div class="text-h5 text-weight-bold text-grey-9">
              Servicios registrados
            </div>

            <div class="text-grey-7">
              Administra los equipos recibidos en el taller
            </div>
          </div>

          <q-btn
            color="primary"
            icon="add"
            label="Registrar servicio"
            @click="nuevoServicio"
          />

        </div>

        <!-- CUANDO NO HAY SERVICIOS -->
        <q-card
          v-if="servicios.length === 0"
          class="q-pa-xl text-center"
        >
          <q-icon
            name="phone_android"
            size="80px"
            color="grey-5"
          />

          <div class="text-h6 q-mt-md text-grey-7">
            No hay servicios registrados
          </div>

          <div class="text-grey-6 q-mb-md">
            Registra el primer equipo del taller.
          </div>

          <q-btn
            color="primary"
            icon="add"
            label="Nuevo servicio"
            @click="nuevoServicio"
          />
        </q-card>

        <!-- LISTA DE SERVICIOS -->
        <div
          v-for="servicio in servicios"
          :key="servicio.id"
          class="q-mb-md"
        >

          <q-card
            class="service-card"
            :class="{
              'payment-pending': servicio.estadoPago === 'Pendiente',
              'payment-abono': servicio.estadoPago === 'Abono',
              'payment-paid': servicio.estadoPago === 'Pagado'
            }"
          >

            <!-- CABECERA DE TARJETA -->
            <q-card-section>

              <div class="row items-start justify-between">

                <div class="row items-center">

                  <q-avatar
                    color="primary"
                    text-color="white"
                    size="55px"
                  >
                    <q-icon name="phone_android" size="30px" />
                  </q-avatar>

                  <div class="q-ml-md">

                    <div class="text-h6 text-weight-bold">
                      {{ servicio.equipo }}
                    </div>

                    <div class="text-grey-7">
                      Cliente: {{ servicio.cliente }}
                    </div>

                  </div>

                </div>

                <!-- ESTADO DEL PAGO -->
                <q-badge
                  v-if="servicio.estadoPago === 'Pagado'"
                  color="positive"
                  class="q-pa-sm"
                >
                  <q-icon name="check_circle" class="q-mr-xs" />
                  Pagado
                </q-badge>

                <q-badge
                  v-else-if="servicio.estadoPago === 'Abono'"
                  color="warning"
                  text-color="dark"
                  class="q-pa-sm"
                >
                  <q-icon name="payments" class="q-mr-xs" />
                  Abono
                </q-badge>

                <q-badge
                  v-else
                  color="negative"
                  class="q-pa-sm"
                >
                  <q-icon name="warning" class="q-mr-xs" />
                  Pendiente
                </q-badge>

              </div>

            </q-card-section>

            <q-separator />

            <!-- INFORMACIÓN -->
            <q-card-section>

              <div class="row q-col-gutter-md">

                <!-- REPARACIÓN -->
                <div class="col-12 col-sm-6 col-md-4">

                  <div class="info-label">
                    Tipo de reparación
                  </div>

                  <div class="info-value">
                    <q-icon
                      name="build"
                      color="primary"
                      class="q-mr-xs"
                    />

                    {{ servicio.reparacion }}
                  </div>

                </div>

                <!-- TÉCNICO -->
                <div class="col-12 col-sm-6 col-md-4">

                  <div class="info-label">
                    Técnico
                  </div>

                  <div class="info-value">
                    <q-icon
                      name="engineering"
                      color="primary"
                      class="q-mr-xs"
                    />

                    {{ servicio.tecnico }}
                  </div>

                </div>

                <!-- FECHA -->
                <div class="col-12 col-sm-6 col-md-4">

                  <div class="info-label">
                    Recepción
                  </div>

                  <div class="info-value">
                    <q-icon
                      name="event"
                      color="primary"
                      class="q-mr-xs"
                    />

                    {{ servicio.fecha }}
                  </div>

                </div>

                <!-- PRECIO -->
                <div class="col-12 col-sm-6 col-md-4">

                  <div class="info-label">
                    Precio
                  </div>

                  <div class="info-value text-weight-bold">
                    ${{ formatearPrecio(servicio.precio) }}
                  </div>

                </div>

                <!-- MÉTODO DE PAGO -->
                <div class="col-12 col-sm-6 col-md-4">

                  <div class="info-label">
                    Método de pago
                  </div>

                  <div class="info-value">
                    {{ servicio.metodoPago }}
                  </div>

                </div>

                <!-- ESTADO DEL EQUIPO -->
                <div class="col-12 col-sm-6 col-md-4">

                  <div class="info-label">
                    Estado del equipo
                  </div>

                  <div class="info-value">

                    <span v-if="servicio.estadoEquipo === 'Recibido'">
                      📥 Recibido
                    </span>

                    <span v-else-if="servicio.estadoEquipo === 'En reparación'">
                      🔧 En reparación
                    </span>

                    <span v-else-if="servicio.estadoEquipo === 'Listo para entregar'">
                      📦 Listo para entregar
                    </span>

                    <span v-else>
                      ✅ Entregado
                    </span>

                  </div>

                </div>

              </div>

              <!-- CALIFICACIÓN -->
              <div
                v-if="servicio.calificacion > 0"
                class="q-mt-md"
              >

                <div class="info-label">
                  Calificación del cliente
                </div>

                <div>
                  <q-rating
                    :model-value="servicio.calificacion"
                    readonly
                    size="25px"
                    color="orange"
                    icon="star_border"
                    icon-selected="star"
                  />
                </div>

              </div>

              <!-- OBSERVACIONES -->
              <div
                v-if="servicio.observaciones"
                class="q-mt-md observation-box"
              >

                <div class="info-label">
                  Observaciones
                </div>

                <div>
                  {{ servicio.observaciones }}
                </div>

              </div>

            </q-card-section>

            <q-separator />

            <!-- BOTONES -->
            <q-card-actions align="right">

              <q-btn
                flat
                color="primary"
                icon="edit"
                label="Editar"
                @click="cargarServicio(servicio)"
              />

              <q-btn
                flat
                color="negative"
                icon="delete"
                label="Eliminar"
                @click="eliminarServicio(servicio.id)"
              />

            </q-card-actions>

          </q-card>

        </div>

      </q-page>
    </q-page-container>

    <!-- MODAL -->
    <q-dialog v-model="mostrarModal">

      <q-card
        class="form-card"
      >

        <!-- TITULO MODAL -->
        <q-card-section class="bg-primary text-white">

          <div class="row items-center">

            <q-icon
              name="phone_android"
              size="30px"
              class="q-mr-sm"
            />

            <div class="text-h6">
              {{ modoEdicion ? 'Editar servicio' : 'Nuevo servicio' }}
            </div>

          </div>

        </q-card-section>

        <!-- FORMULARIO -->
        <q-form
          @submit.prevent="guardarServicio"
        >

          <q-card-section>

            <!-- CLIENTE -->
            <q-input
              v-model="servicioActual.cliente"
              label="Nombre del cliente *"
              outlined
              class="q-mb-md"
              :rules="[
                val => !!val || 'El nombre del cliente es obligatorio',
                val => val.length >= 3 || 'Mínimo 3 caracteres'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <!-- EQUIPO -->
            <q-input
              v-model="servicioActual.equipo"
              label="Marca y modelo *"
              placeholder="Ej: Samsung A15"
              outlined
              class="q-mb-md"
              :rules="[
                val => !!val || 'El equipo es obligatorio',
                val => val.length >= 3 || 'Ingresa marca y modelo'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="phone_android" />
              </template>
            </q-input>

            <!-- REPARACIÓN -->
            <q-select
              v-model="servicioActual.reparacion"
              label="Tipo de reparación *"
              outlined
              class="q-mb-md"
              :options="[
                'Cambio de pantalla',
                'Cambio de batería',
                'Cambio de pin de carga',
                'Liberación',
                'Mantenimiento de software',
                'Cambio de flex',
                'Otros'
              ]"
              :rules="[
                val => !!val || 'Selecciona el tipo de reparación'
              ]"
            />

            <!-- TÉCNICO -->
            <q-select
              v-model="servicioActual.tecnico"
              label="Técnico que atendió *"
              outlined
              class="q-mb-md"
              :options="[
                'Don Efraín',
                'Don Camilo Aguirre',
                'Doña Isabella de Aguirre'
              ]"
              :rules="[
                val => !!val || 'Selecciona el técnico'
              ]"
            />

            <!-- FECHA -->
            <q-input
              v-model="servicioActual.fecha"
              label="Fecha y hora de recepción *"
              type="datetime-local"
              outlined
              class="q-mb-md"
              :rules="[
                val => !!val || 'La fecha es obligatoria'
              ]"
            />

            <!-- PRECIO -->
            <q-input
              v-model.number="servicioActual.precio"
              label="Precio cobrado *"
              type="number"
              prefix="$"
              outlined
              class="q-mb-md"
              :rules="[
                val => val !== null && val !== '' || 'El precio es obligatorio',
                val => Number(val) >= 0 || 'El precio no puede ser negativo'
              ]"
            />

            <!-- MÉTODO DE PAGO -->
            <q-select
              v-model="servicioActual.metodoPago"
              label="Método de pago *"
              outlined
              class="q-mb-md"
              :options="[
                'Efectivo',
                'Transferencia',
                'Tarjeta'
              ]"
              :rules="[
                val => !!val || 'Selecciona el método de pago'
              ]"
            />

            <!-- ESTADO DEL PAGO -->
            <q-select
              v-model="servicioActual.estadoPago"
              label="Estado del pago *"
              outlined
              class="q-mb-md"
              :options="[
                'Pagado',
                'Pendiente',
                'Abono'
              ]"
              :rules="[
                val => !!val || 'Selecciona el estado del pago'
              ]"
            />

            <!-- ESTADO DEL EQUIPO -->
            <q-select
              v-model="servicioActual.estadoEquipo"
              label="Estado del equipo *"
              outlined
              class="q-mb-md"
              :options="[
                'Recibido',
                'En reparación',
                'Listo para entregar',
                'Entregado'
              ]"
              :rules="[
                val => !!val || 'Selecciona el estado del equipo'
              ]"
            />

            <!-- CALIFICACIÓN -->
            <div class="q-mb-md">

              <div class="text-subtitle2 q-mb-sm">
                Calificación del cliente
              </div>

              <q-rating
                v-model="servicioActual.calificacion"
                size="35px"
                color="orange"
                icon="star_border"
                icon-selected="star"
              />

              <div class="text-caption text-grey-6">
                Registrar cuando el cliente recoja el equipo
              </div>

            </div>

            <!-- OBSERVACIONES -->
            <q-input
              v-model="servicioActual.observaciones"
              label="Observaciones"
              type="textarea"
              outlined
              autogrow
              placeholder="Ej: Pantalla partida en la esquina superior..."
            />

          </q-card-section>

          <!-- BOTONES MODAL -->
          <q-card-actions
            align="right"
            class="q-pa-md"
          >

            <q-btn
              flat
              label="Cancelar"
              color="grey-7"
              @click="mostrarModal = false"
            />

            <q-btn
              type="submit"
              color="primary"
              icon="save"
              :label="modoEdicion ? 'Actualizar' : 'Guardar'"
            />

          </q-card-actions>

        </q-form>

      </q-card>

    </q-dialog>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

/*
|--------------------------------------------------------------------------
| PERSISTENCIA
|--------------------------------------------------------------------------
*/

const servicios = useLocalStorage(
  'servicios-tecnicos-don-efrain',
  []
)

/*
|--------------------------------------------------------------------------
| VARIABLES
|--------------------------------------------------------------------------
*/

const mostrarModal = ref(false)
const modoEdicion = ref(false)

const servicioActual = ref({
  id: null,
  cliente: '',
  equipo: '',
  reparacion: '',
  tecnico: '',
  fecha: '',
  precio: 0,
  metodoPago: '',
  estadoPago: '',
  estadoEquipo: '',
  calificacion: 0,
  observaciones: ''
})

/*
|--------------------------------------------------------------------------
| LIMPIAR FORMULARIO
|--------------------------------------------------------------------------
*/

function limpiarFormulario() {
  servicioActual.value = {
    id: null,
    cliente: '',
    equipo: '',
    reparacion: '',
    tecnico: '',
    fecha: '',
    precio: 0,
    metodoPago: '',
    estadoPago: '',
    estadoEquipo: '',
    calificacion: 0,
    observaciones: ''
  }
}

/*
|--------------------------------------------------------------------------
| NUEVO SERVICIO
|--------------------------------------------------------------------------
*/

function nuevoServicio() {
  modoEdicion.value = false

  limpiarFormulario()

  const ahora = new Date()

  const anio = ahora.getFullYear()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')
  const hora = String(ahora.getHours()).padStart(2, '0')
  const minutos = String(ahora.getMinutes()).padStart(2, '0')

  servicioActual.value.fecha =
    `${anio}-${mes}-${dia}T${hora}:${minutos}`

  mostrarModal.value = true
}

/*
|--------------------------------------------------------------------------
| GUARDAR
|--------------------------------------------------------------------------
*/

function guardarServicio() {
  if (modoEdicion.value) {
    editarServicio()
  } else {
    agregarServicio()
  }

  mostrarModal.value = false
}

/*
|--------------------------------------------------------------------------
| AGREGAR
|--------------------------------------------------------------------------
*/

function agregarServicio() {
  const nuevoServicio = {
    id: Date.now(),
    cliente: servicioActual.value.cliente,
    equipo: servicioActual.value.equipo,
    reparacion: servicioActual.value.reparacion,
    tecnico: servicioActual.value.tecnico,
    fecha: servicioActual.value.fecha,
    precio: servicioActual.value.precio,
    metodoPago: servicioActual.value.metodoPago,
    estadoPago: servicioActual.value.estadoPago,
    estadoEquipo: servicioActual.value.estadoEquipo,
    calificacion: servicioActual.value.calificacion,
    observaciones: servicioActual.value.observaciones
  }

  servicios.value.push(nuevoServicio)
}

/*
|--------------------------------------------------------------------------
| CARGAR PARA EDITAR
|--------------------------------------------------------------------------
*/

function cargarServicio(servicio) {
  modoEdicion.value = true

  servicioActual.value = {
    id: servicio.id,
    cliente: servicio.cliente,
    equipo: servicio.equipo,
    reparacion: servicio.reparacion,
    tecnico: servicio.tecnico,
    fecha: servicio.fecha,
    precio: servicio.precio,
    metodoPago: servicio.metodoPago,
    estadoPago: servicio.estadoPago,
    estadoEquipo: servicio.estadoEquipo,
    calificacion: servicio.calificacion,
    observaciones: servicio.observaciones
  }

  mostrarModal.value = true
}

/*
|--------------------------------------------------------------------------
| EDITAR
|--------------------------------------------------------------------------
*/

function editarServicio() {
  for (let i = 0; i < servicios.value.length; i++) {

    if (servicios.value[i].id === servicioActual.value.id) {

      servicios.value[i] = {
        id: servicioActual.value.id,
        cliente: servicioActual.value.cliente,
        equipo: servicioActual.value.equipo,
        reparacion: servicioActual.value.reparacion,
        tecnico: servicioActual.value.tecnico,
        fecha: servicioActual.value.fecha,
        precio: servicioActual.value.precio,
        metodoPago: servicioActual.value.metodoPago,
        estadoPago: servicioActual.value.estadoPago,
        estadoEquipo: servicioActual.value.estadoEquipo,
        calificacion: servicioActual.value.calificacion,
        observaciones: servicioActual.value.observaciones
      }

      break
    }
  }
}

/*
|--------------------------------------------------------------------------
| ELIMINAR
|--------------------------------------------------------------------------
*/

function eliminarServicio(id) {
  const confirmar = window.confirm(
    '¿Está seguro de eliminar este servicio? Esta acción no se puede deshacer.'
  )

  if (confirmar) {

    for (let i = 0; i < servicios.value.length; i++) {

      if (servicios.value[i].id === id) {

        servicios.value.splice(i, 1)

        break
      }
    }
  }
}

/*
|--------------------------------------------------------------------------
| CONTADORES
|--------------------------------------------------------------------------
*/

function contarPendientes() {
  let cantidad = 0

  for (let i = 0; i < servicios.value.length; i++) {

    if (
      servicios.value[i].estadoEquipo !== 'Entregado'
    ) {
      cantidad++
    }
  }

  return cantidad
}

function contarPagados() {
  let cantidad = 0

  for (let i = 0; i < servicios.value.length; i++) {

    if (
      servicios.value[i].estadoPago === 'Pagado'
    ) {
      cantidad++
    }
  }

  return cantidad
}

/*
|--------------------------------------------------------------------------
| FORMATO DEL PRECIO
|--------------------------------------------------------------------------
*/

function formatearPrecio(precio) {
  if (!precio) {
    return '0'
  }

  return Number(precio).toLocaleString('es-CO')
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.dashboard-card {
  border-radius: 14px;
  transition: 0.2s;
}

.dashboard-card:hover {
  transform: translateY(-2px);
}

.service-card {
  border-radius: 16px;
  overflow: hidden;
  border-left: 6px solid #1976d2;
  transition: 0.2s;
}

.service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.12);
}

.payment-pending {
  border-left-color: #f44336;
}

.payment-abono {
  border-left-color: #ff9800;
}

.payment-paid {
  border-left-color: #21ba45;
}

.info-label {
  color: #757575;
  font-size: 13px;
  margin-bottom: 4px;
}

.info-value {
  color: #333333;
  font-size: 15px;
}

.observation-box {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 12px;
}

.form-card {
  width: 650px;
  max-width: 95vw;
  border-radius: 15px;
}

@media (max-width: 600px) {
  .form-card {
    width: 100%;
    max-width: 100%;
  }

  .q-toolbar .q-btn {
    padding-left: 8px;
    padding-right: 8px;
  }

  .q-toolbar .q-btn .q-btn__content {
    font-size: 12px;
  }
}
</style>
