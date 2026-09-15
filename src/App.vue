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
          <div class="text-body2">
            Gestión de celulares y tablets
          </div>
        </q-toolbar-title>

        <!-- ÚNICO BOTÓN PARA CREAR PEDIDO -->
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

                <div class="text-body1 text-grey-8">
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

                <div class="text-body1 text-grey-8">
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

                <div class="text-body1 text-grey-8">
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
              Pedidos registrados
            </div>

            <div class="text-body1 text-grey-7">
              Administra los equipos recibidos en el taller
            </div>
          </div>

        </div>


        <!-- SIN SERVICIOS -->
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
            No hay pedidos registrados
          </div>

          <div class="text-body1 text-grey-6 q-mb-md">
            Registra el primer equipo del taller.
          </div>


        </q-card>


        <!-- LISTA DE SERVICIOS -->
        <div
          v-for="servicio in servicios"
          :key="servicio.id"
          class="q-mb-sm"
        >

          <!-- TARJETA MÁS PEQUEÑA -->
          <q-card
            class="service-card"
            :class="{
              'payment-pending': servicio.estadoPago === 'Pendiente',
              'payment-abono': servicio.estadoPago === 'Abono',
              'payment-paid': servicio.estadoPago === 'Pagado'
            }"
          >

            <!-- CABECERA -->
            <q-card-section class="q-py-sm">

              <div class="row items-center justify-between">

                <div class="row items-center">

                  <q-avatar
                    color="primary"
                    text-color="white"
                    size="45px"
                  >
                    <q-icon
                      name="phone_android"
                      size="25px"
                    />
                  </q-avatar>

                  <div class="q-ml-sm">

                    <div class="text-subtitle1 text-weight-bold">
                      {{ servicio.marca }} {{ servicio.modelo }}
                    </div>

                    <div class="text-body2 text-grey-7">
                      Cliente: {{ servicio.cliente }}
                    </div>

                  </div>

                </div>


                <!-- ESTADO DEL PAGO -->
                <q-badge
                  v-if="servicio.estadoPago === 'Pagado'"
                  color="positive"
                  class="q-pa-xs"
                >
                  <q-icon
                    name="check_circle"
                    class="q-mr-xs"
                  />
                  Pagado
                </q-badge>

                <q-badge
                  v-else-if="servicio.estadoPago === 'Abono'"
                  color="warning"
                  text-color="dark"
                  class="q-pa-xs"
                >
                  <q-icon
                    name="payments"
                    class="q-mr-xs"
                  />
                  Abono
                </q-badge>

                <q-badge
                  v-else
                  color="negative"
                  class="q-pa-xs"
                >
                  <q-icon
                    name="warning"
                    class="q-mr-xs"
                  />
                  Pendiente
                </q-badge>

              </div>

            </q-card-section>


            <q-separator />


            <!-- INFORMACIÓN -->
            <q-card-section class="q-py-sm">

              <div class="row q-col-gutter-sm">

                <!-- MARCA -->
                <div class="col-6 col-md-3">

                  <div class="info-label">
                    Marca
                  </div>

                  <div class="info-value">
                    {{ servicio.marca }}
                  </div>

                </div>


                <!-- MODELO -->
                <div class="col-6 col-md-3">

                  <div class="info-label">
                    Modelo
                  </div>

                  <div class="info-value">
                    {{ servicio.modelo }}
                  </div>

                </div>


                <!-- ARREGLOS -->
                <div class="col-12 col-md-6">

                  <div class="info-label">
                    Arreglos
                  </div>

                  <div class="info-value">

                    <q-chip
                      v-for="arreglo in servicio.arreglos"
                      :key="arreglo"
                      color="primary"
                      text-color="white"
                      dense
                      size="sm"
                    >
                      {{ arreglo }}
                    </q-chip>

                  </div>

                </div>


                <!-- TÉCNICO -->
                <div class="col-6 col-md-3">

                  <div class="info-label">
                    Técnico
                  </div>

                  <div class="info-value">

                    <q-icon
                      name="engineering"
                      color="primary"
                      size="18px"
                      class="q-mr-xs"
                    />

                    {{ servicio.tecnico }}

                  </div>

                </div>


                <!-- FECHA -->
                <div class="col-6 col-md-3">

                  <div class="info-label">
                    Recepción
                  </div>

                  <div class="info-value">

                    <q-icon
                      name="event"
                      color="primary"
                      size="18px"
                      class="q-mr-xs"
                    />

                    {{ formatearFecha(servicio.fecha) }}

                  </div>

                </div>


                <!-- PRECIO -->
                <div class="col-6 col-md-3">

                  <div class="info-label">
                    Precio
                  </div>

                  <div class="info-value text-weight-bold">
                    ${{ formatearPrecio(servicio.precio) }}
                  </div>

                </div>


                <!-- MÉTODO DE PAGO -->
                <div class="col-6 col-md-3">

                  <div class="info-label">
                    Método de pago
                  </div>

                  <div class="info-value">
                    {{ servicio.metodoPago }}
                  </div>

                </div>


                <!-- ESTADO DEL PAGO -->
                <div class="col-6 col-md-3">

                  <div class="info-label">
                    Estado del pago
                  </div>

                  <div class="info-value">

                    {{ servicio.estadoPago }}

                    <span
                      v-if="servicio.estadoPago === 'Abono'"
                    >
                      — ${{ formatearPrecio(servicio.valorAbono) }}
                    </span>

                  </div>

                </div>


                <!-- ESTADO DEL EQUIPO -->
                <div class="col-12 col-md-3">

                  <div class="info-label">
                    Estado del equipo
                  </div>

                  <div class="info-value">

                    <q-chip
                      v-if="servicio.estadoEquipo === 'Recibido'"
                      color="blue"
                      text-color="white"
                      icon="move_to_inbox"
                      dense
                    >
                      Recibido
                    </q-chip>

                    <q-chip
                      v-else-if="servicio.estadoEquipo === 'En reparación'"
                      color="orange"
                      text-color="white"
                      icon="build"
                      dense
                    >
                      En reparación
                    </q-chip>

                    <q-chip
                      v-else-if="servicio.estadoEquipo === 'Listo para entregar'"
                      color="purple"
                      text-color="white"
                      icon="inventory_2"
                      dense
                    >
                      Listo para entregar
                    </q-chip>

                    <q-chip
                      v-else
                      color="positive"
                      text-color="white"
                      icon="check_circle"
                      dense
                    >
                      Entregado
                    </q-chip>

                  </div>

                </div>

              </div>


              <!-- CALIFICACIÓN -->
              <div
                v-if="servicio.estadoEquipo === 'Entregado'"
                class="q-mt-sm rating-box"
              >

                <div class="row items-center justify-between">

                  <div>

                    <div class="info-label">
                      ⭐ Calificación del cliente
                    </div>

                    <div
                      v-if="servicio.calificacion > 0"
                      class="row items-center"
                    >

                      <q-rating
                        :model-value="servicio.calificacion"
                        readonly
                        size="27px"
                        color="orange"
                        icon="star_border"
                        icon-selected="star"
                      />

                      <span class="q-ml-sm text-body2 text-grey-7">
                        {{ servicio.calificacion }}/5
                      </span>

                    </div>

                    <div
                      v-else
                      class="text-grey-6"
                    >
                      Sin calificación
                    </div>

                  </div>


                  <!-- BOTÓN PARA EDITAR CALIFICACIÓN -->
                  <q-btn
                    flat
                    dense
                    color="orange-9"
                    icon="star"
                    label="Editar calificación"
                    @click="editarCalificacion(servicio)"
                  />

                </div>

              </div>


              <!-- OBSERVACIONES -->
              <div
                v-if="servicio.observaciones"
                class="q-mt-sm observation-box"
              >

                <div class="info-label">
                  Observaciones
                </div>

                <div class="text-body2">
                  {{ servicio.observaciones }}
                </div>

              </div>

            </q-card-section>


            <!-- CAMBIO DE ESTADO -->
            <template
              v-if="servicio.estadoEquipo !== 'Entregado'"
            >

              <q-separator />

              <q-card-section class="status-section q-py-sm">

                <div class="text-body2 text-weight-medium q-mb-xs">
                  Cambiar estado del equipo
                </div>

                <div class="row q-gutter-xs">

                  <q-btn
                    outline
                    dense
                    color="blue"
                    icon="move_to_inbox"
                    label="Recibido"
                    :disable="servicio.estadoEquipo === 'Recibido'"
                    @click="cambiarEstadoEquipo(servicio, 'Recibido')"
                  />

                  <q-btn
                    outline
                    dense
                    color="orange"
                    icon="build"
                    label="En reparación"
                    :disable="servicio.estadoEquipo === 'En reparación'"
                    @click="cambiarEstadoEquipo(servicio, 'En reparación')"
                  />

                  <q-btn
                    outline
                    dense
                    color="purple"
                    icon="inventory_2"
                    label="Listo para entregar"
                    :disable="servicio.estadoEquipo === 'Listo para entregar'"
                    @click="cambiarEstadoEquipo(servicio, 'Listo para entregar')"
                  />

                  <q-btn
                    outline
                    dense
                    color="positive"
                    icon="check_circle"
                    label="Entregado"
                    @click="cambiarEstadoEquipo(servicio, 'Entregado')"
                  />

                </div>

              </q-card-section>

            </template>


            <q-separator />


            <!-- BOTONES -->
            <q-card-actions
              align="right"
              class="q-py-xs"
            >

              <!-- PEDIDOS NO ENTREGADOS -->
              <template
                v-if="servicio.estadoEquipo !== 'Entregado'"
              >

                <q-btn
                  flat
                  dense
                  color="primary"
                  icon="edit"
                  label="Editar"
                  @click="cargarServicio(servicio)"
                />

                <q-btn
                  flat
                  dense
                  color="negative"
                  icon="delete"
                  label="Eliminar"
                  @click="confirmarEliminar(servicio.id)"
                />

              </template>


              <!-- PEDIDO ENTREGADO -->
              <q-badge
                v-else
                color="positive"
                class="q-pa-xs"
              >

                <q-icon
                  name="lock"
                  size="16px"
                  class="q-mr-xs"
                />

                Datos del pedido cerrados

              </q-badge>

            </q-card-actions>

          </q-card>

        </div>

      </q-page>
    </q-page-container>


    <!-- ===================================================== -->
    <!-- MODAL FORMULARIO -->
    <!-- ===================================================== -->

    <q-dialog v-model="mostrarModal">

      <q-card class="form-card">

        <q-card-section class="bg-primary text-white">

          <div class="row items-center">

            <q-icon
              name="phone_android"
              size="30px"
              class="q-mr-sm"
            />

            <div class="text-h6">
              {{ modoEdicion ? 'Editar pedido' : 'Nuevo pedido' }}
            </div>

          </div>

        </q-card-section>


        <q-form
          @submit.prevent="guardarServicio"
        >

          <q-card-section>

            <!-- CLIENTE -->
            <q-input
              v-model.trim="servicioActual.cliente"
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


            <!-- MARCA -->
            <q-select
              v-model="servicioActual.marca"
              label="Marca *"
              outlined
              class="q-mb-md"
              :options="marcas"
              emit-value
              map-options
              :rules="[
                val => !!val || 'Selecciona la marca'
              ]"
            >

              <template v-slot:prepend>
                <q-icon name="phone_android" />
              </template>

            </q-select>


            <!-- MODELO -->
            <q-input
              v-model.trim="servicioActual.modelo"
              label="Modelo *"
              placeholder="Ej: A15, Redmi Note 13, iPhone 13"
              outlined
              class="q-mb-md"
              :rules="[
                val => !!val || 'El modelo es obligatorio',
                val => val.length >= 2 || 'Ingresa un modelo válido'
              ]"
            >

              <template v-slot:prepend>
                <q-icon name="devices" />
              </template>

            </q-input>


            <!-- ARREGLOS -->
            <q-select
              v-model="servicioActual.arreglos"
              label="Arreglos por hacer *"
              outlined
              multiple
              use-chips
              class="q-mb-md"
              :options="opcionesArreglos"
              :rules="[
                val => Array.isArray(val) && val.length > 0
                  || 'Selecciona al menos un arreglo'
              ]"
            >

              <template v-slot:prepend>
                <q-icon name="build" />
              </template>

            </q-select>


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
              :model-value="formatearFecha(servicioActual.fecha)"
              label="Fecha y hora de recepción"
              outlined
              readonly
              disable
              class="q-mb-md"
            >

              <template v-slot:prepend>
                <q-icon name="event" />
              </template>

            </q-input>


            <!-- PRECIO -->
            <q-input
              v-model.number="servicioActual.precio"
              label="Precio cobrado *"
              type="number"
              prefix="$"
              outlined
              class="q-mb-md"
              :rules="[
                val => val !== null && val !== ''
                  || 'El precio es obligatorio',

                val => Number(val) >= 0
                  || 'El precio no puede ser negativo'
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
              @update:model-value="manejarEstadoPago"
            />


            <!-- ABONO -->
            <q-input
              v-if="servicioActual.estadoPago === 'Abono'"
              v-model.number="servicioActual.valorAbono"
              label="Valor del abono *"
              type="number"
              prefix="$"
              outlined
              class="q-mb-md"
              :rules="[
                val => val !== null && val !== ''
                  || 'Ingresa el valor del abono',

                val => Number(val) > 0
                  || 'El abono debe ser mayor a $0',

                val => Number(val) <= Number(servicioActual.precio)
                  || 'El abono no puede ser mayor que el precio'
              ]"
            >

              <template v-slot:prepend>
                <q-icon name="payments" />
              </template>

            </q-input>


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
            >

              <template v-slot:prepend>
                <q-icon name="inventory_2" />
              </template>

            </q-select>


            <!-- CALIFICACIÓN -->
            <div
              v-if="servicioActual.estadoEquipo === 'Entregado'"
              class="q-mb-md rating-box"
            >

              <div class="text-body1 text-weight-medium q-mb-sm">
                ⭐ Calificación del cliente
              </div>

              <q-rating
                v-model="servicioActual.calificacion"
                size="42px"
                color="orange"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
              />

              <div class="text-body2 text-grey-7 q-mt-sm">

                <span v-if="servicioActual.calificacion > 0">
                  {{ servicioActual.calificacion }} de 5 estrellas
                </span>

                <span v-else>
                  Selecciona una calificación
                </span>

              </div>

            </div>


            <!-- OBSERVACIONES -->
            <q-input
              v-model.trim="servicioActual.observaciones"
              label="Observaciones"
              type="textarea"
              outlined
              autogrow
              class="q-mb-md"
              placeholder="Ej: Pantalla partida en la esquina superior..."
            />

          </q-card-section>


          <!-- BOTONES -->
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


    <!-- ===================================================== -->
    <!-- MODAL SOLO PARA CALIFICACIÓN -->
    <!-- ===================================================== -->

    <q-dialog v-model="mostrarModalCalificacion">

      <q-card class="rating-dialog">

        <q-card-section class="bg-orange text-white">

          <div class="row items-center">

            <q-icon
              name="star"
              size="30px"
              class="q-mr-sm"
            />

            <div class="text-h6">
              Calificación del cliente
            </div>

          </div>

        </q-card-section>


        <q-card-section class="text-center">

          <div class="text-subtitle1 text-grey-8 q-mb-md">
            {{ servicioCalificacion?.cliente }}
          </div>

          <div class="text-body1 q-mb-md">
            ¿Cómo califica el servicio?
          </div>


          <q-rating
            v-model="calificacionTemporal"
            size="55px"
            color="orange"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
          />


          <div class="text-h6 text-orange-9 q-mt-md">

            <span v-if="calificacionTemporal > 0">
              {{ calificacionTemporal }} de 5 estrellas
            </span>

            <span v-else>
              Seleccione una calificación
            </span>

          </div>

        </q-card-section>


        <q-card-actions
          align="right"
          class="q-pa-md"
        >

          <q-btn
            flat
            label="Cancelar"
            color="grey-7"
            @click="mostrarModalCalificacion = false"
          />

          <q-btn
            color="orange"
            icon="save"
            label="Guardar calificación"
            :disable="calificacionTemporal < 1"
            @click="guardarCalificacion"
          />

        </q-card-actions>

      </q-card>

    </q-dialog>


    <!-- ===================================================== -->
    <!-- CONFIRMACIÓN DE ELIMINACIÓN -->
    <!-- ===================================================== -->

    <q-dialog v-model="mostrarConfirmacion">

      <q-card class="confirm-card">

        <q-card-section>

          <div class="row items-center">

            <q-avatar
              color="negative"
              text-color="white"
              icon="delete"
            />

            <div class="q-ml-md">

              <div class="text-h6">
                Eliminar pedido
              </div>

              <div class="text-body1 text-grey-7">
                ¿Está seguro de eliminar este pedido?
              </div>

            </div>

          </div>

        </q-card-section>


        <q-card-actions align="right">

          <q-btn
            flat
            label="Cancelar"
            color="grey-7"
            v-close-popup
          />

          <q-btn
            color="negative"
            label="Eliminar"
            icon="delete"
            @click="eliminarServicio"
          />

        </q-card-actions>

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

const mostrarConfirmacion = ref(false)

const servicioAEliminar = ref(null)


// VARIABLES PARA CALIFICACIÓN
const mostrarModalCalificacion = ref(false)

const servicioCalificacion = ref(null)

const calificacionTemporal = ref(0)


/*
|--------------------------------------------------------------------------
| OPCIONES
|--------------------------------------------------------------------------
*/

const marcas = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Samsung', value: 'Samsung' },
  { label: 'Xiaomi', value: 'Xiaomi' },
  { label: 'Motorola', value: 'Motorola' },
  { label: 'Huawei', value: 'Huawei' },
  { label: 'Honor', value: 'Honor' },
  { label: 'Oppo', value: 'Oppo' },
  { label: 'Realme', value: 'Realme' },
  { label: 'Tecno', value: 'Tecno' },
  { label: 'Infinix', value: 'Infinix' },
  { label: 'ZTE', value: 'ZTE' },
  { label: 'Nokia', value: 'Nokia' },
  { label: 'Otra', value: 'Otra' }
]


const opcionesArreglos = [
  'Cambio de pantalla',
  'Cambio de batería',
  'Cambio de pin de carga',
  'Liberación',
  'Mantenimiento de software',
  'Cambio de flex',
  'Cambio de cámara',
  'Cambio de parlante',
  'Cambio de micrófono',
  'Cambio de botones',
  'Diagnóstico',
  'Otros'
]


/*
|--------------------------------------------------------------------------
| SERVICIO ACTUAL
|--------------------------------------------------------------------------
*/

const servicioActual = ref(
  crearServicioVacio()
)


/*
|--------------------------------------------------------------------------
| CREAR SERVICIO VACÍO
|--------------------------------------------------------------------------
*/

function crearServicioVacio() {

  return {

    id: null,

    cliente: '',

    marca: '',

    modelo: '',

    arreglos: [],

    tecnico: '',

    fecha: '',

    precio: null,

    metodoPago: '',

    estadoPago: '',

    valorAbono: null,

    estadoEquipo: 'Recibido',

    calificacion: 0,

    observaciones: ''

  }
}


/*
|--------------------------------------------------------------------------
| FECHA ACTUAL
|--------------------------------------------------------------------------
*/

function obtenerFechaActual() {

  const ahora = new Date()

  const anio =
    ahora.getFullYear()

  const mes =
    String(
      ahora.getMonth() + 1
    ).padStart(2, '0')

  const dia =
    String(
      ahora.getDate()
    ).padStart(2, '0')

  const hora =
    String(
      ahora.getHours()
    ).padStart(2, '0')

  const minutos =
    String(
      ahora.getMinutes()
    ).padStart(2, '0')

  return `${anio}-${mes}-${dia}T${hora}:${minutos}`
}


/*
|--------------------------------------------------------------------------
| NUEVO PEDIDO
|--------------------------------------------------------------------------
*/

function nuevoServicio() {

  modoEdicion.value = false

  servicioActual.value =
    crearServicioVacio()

  servicioActual.value.fecha =
    obtenerFechaActual()

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

    cliente:
      servicioActual.value.cliente,

    marca:
      servicioActual.value.marca,

    modelo:
      servicioActual.value.modelo,

    arreglos:
      [...servicioActual.value.arreglos],

    tecnico:
      servicioActual.value.tecnico,

    fecha:
      servicioActual.value.fecha,

    precio:
      Number(
        servicioActual.value.precio
      ),

    metodoPago:
      servicioActual.value.metodoPago,

    estadoPago:
      servicioActual.value.estadoPago,

    valorAbono:
      servicioActual.value.estadoPago === 'Abono'
        ? Number(
            servicioActual.value.valorAbono
          )
        : 0,

    estadoEquipo:
      servicioActual.value.estadoEquipo ||
      'Recibido',

    calificacion:
      servicioActual.value.estadoEquipo === 'Entregado'
        ? Number(
            servicioActual.value.calificacion
          )
        : 0,

    observaciones:
      servicioActual.value.observaciones

  }

  servicios.value.push(
    nuevoServicio
  )
}


/*
|--------------------------------------------------------------------------
| CARGAR PEDIDO PARA EDITAR
|--------------------------------------------------------------------------
*/

function cargarServicio(servicio) {

  // IMPORTANTE:
  // Un pedido entregado no se puede editar
  // desde el formulario general.
  // Su calificación se modifica aparte.

  if (
    servicio.estadoEquipo === 'Entregado'
  ) {
    return
  }

  modoEdicion.value = true

  servicioActual.value = {

    id:
      servicio.id,

    cliente:
      servicio.cliente,

    marca:
      servicio.marca,

    modelo:
      servicio.modelo,

    arreglos:
      Array.isArray(
        servicio.arreglos
      )
        ? [...servicio.arreglos]
        : servicio.reparacion
          ? [servicio.reparacion]
          : [],

    tecnico:
      servicio.tecnico,

    fecha:
      servicio.fecha,

    precio:
      servicio.precio,

    metodoPago:
      servicio.metodoPago,

    estadoPago:
      servicio.estadoPago,

    valorAbono:
      servicio.valorAbono || 0,

    estadoEquipo:
      servicio.estadoEquipo ||
      'Recibido',

    calificacion:
      servicio.calificacion || 0,

    observaciones:
      servicio.observaciones || ''

  }

  mostrarModal.value = true
}


/*
|--------------------------------------------------------------------------
| EDITAR PEDIDO
|--------------------------------------------------------------------------
*/

function editarServicio() {

  const indice =
    servicios.value.findIndex(
      servicio =>
        servicio.id ===
        servicioActual.value.id
    )

  if (indice === -1) {
    return
  }

  // Los entregados no se modifican
  // desde este formulario.
  if (
    servicios.value[indice].estadoEquipo ===
    'Entregado'
  ) {
    return
  }

  servicios.value[indice] = {

    id:
      servicioActual.value.id,

    cliente:
      servicioActual.value.cliente,

    marca:
      servicioActual.value.marca,

    modelo:
      servicioActual.value.modelo,

    arreglos:
      [...servicioActual.value.arreglos],

    tecnico:
      servicioActual.value.tecnico,

    fecha:
      servicioActual.value.fecha,

    precio:
      Number(
        servicioActual.value.precio
      ),

    metodoPago:
      servicioActual.value.metodoPago,

    estadoPago:
      servicioActual.value.estadoPago,

    valorAbono:
      servicioActual.value.estadoPago === 'Abono'
        ? Number(
            servicioActual.value.valorAbono
          )
        : 0,

    estadoEquipo:
      servicioActual.value.estadoEquipo,

    calificacion:
      servicioActual.value.estadoEquipo === 'Entregado'
        ? Number(
            servicioActual.value.calificacion
          )
        : 0,

    observaciones:
      servicioActual.value.observaciones

  }
}


/*
|--------------------------------------------------------------------------
| CAMBIAR ESTADO DEL EQUIPO
|--------------------------------------------------------------------------
*/

function cambiarEstadoEquipo(
  servicio,
  nuevoEstado
) {

  if (
    servicio.estadoEquipo === 'Entregado'
  ) {
    return
  }

  servicio.estadoEquipo =
    nuevoEstado

  // Si deja de estar entregado,
  // se elimina la calificación.
  if (
    nuevoEstado !== 'Entregado'
  ) {

    servicio.calificacion = 0

  }
}


/*
|--------------------------------------------------------------------------
| EDITAR CALIFICACIÓN
|--------------------------------------------------------------------------
*/

function editarCalificacion(
  servicio
) {

  if (
    servicio.estadoEquipo !== 'Entregado'
  ) {
    return
  }

  servicioCalificacion.value =
    servicio

  calificacionTemporal.value =
    Number(
      servicio.calificacion || 0
    )

  mostrarModalCalificacion.value =
    true
}


/*
|--------------------------------------------------------------------------
| GUARDAR CALIFICACIÓN
|--------------------------------------------------------------------------
*/

function guardarCalificacion() {

  if (
    !servicioCalificacion.value
  ) {
    return
  }

  if (
    calificacionTemporal.value < 1
  ) {
    return
  }

  servicioCalificacion.value.calificacion =
    Number(
      calificacionTemporal.value
    )

  mostrarModalCalificacion.value =
    false

  servicioCalificacion.value =
    null

  calificacionTemporal.value =
    0
}


/*
|--------------------------------------------------------------------------
| CONFIRMAR ELIMINACIÓN
|--------------------------------------------------------------------------
*/

function confirmarEliminar(id) {

  const servicio =
    servicios.value.find(
      item => item.id === id
    )

  if (!servicio) {
    return
  }

  if (
    servicio.estadoEquipo ===
    'Entregado'
  ) {
    return
  }

  servicioAEliminar.value =
    id

  mostrarConfirmacion.value =
    true
}


/*
|--------------------------------------------------------------------------
| ELIMINAR
|--------------------------------------------------------------------------
*/

function eliminarServicio() {

  if (
    !servicioAEliminar.value
  ) {
    return
  }

  const indice =
    servicios.value.findIndex(
      servicio =>
        servicio.id ===
        servicioAEliminar.value
    )

  if (indice !== -1) {

    if (
      servicios.value[indice].estadoEquipo !==
      'Entregado'
    ) {

      servicios.value.splice(
        indice,
        1
      )

    }

  }

  servicioAEliminar.value =
    null

  mostrarConfirmacion.value =
    false
}


/*
|--------------------------------------------------------------------------
| ESTADO DEL PAGO
|--------------------------------------------------------------------------
*/

function manejarEstadoPago(
  valor
) {

  if (valor !== 'Abono') {

    servicioActual.value.valorAbono =
      0

  }
}


/*
|--------------------------------------------------------------------------
| CONTADOR PENDIENTES
|--------------------------------------------------------------------------
*/

function contarPendientes() {

  return servicios.value.filter(
    servicio =>
      servicio.estadoEquipo !==
      'Entregado'
  ).length
}


/*
|--------------------------------------------------------------------------
| CONTADOR PAGADOS
|--------------------------------------------------------------------------
*/

function contarPagados() {

  return servicios.value.filter(
    servicio =>
      servicio.estadoPago ===
      'Pagado'
  ).length
}


/*
|--------------------------------------------------------------------------
| FORMATO PRECIO
|--------------------------------------------------------------------------
*/

function formatearPrecio(
  precio
) {

  if (
    precio === null ||
    precio === undefined ||
    precio === ''
  ) {

    return '0'

  }

  return Number(
    precio
  ).toLocaleString(
    'es-CO'
  )
}


/*
|--------------------------------------------------------------------------
| FORMATO FECHA
|--------------------------------------------------------------------------
*/

function formatearFecha(
  fecha
) {

  if (!fecha) {
    return ''
  }

  const fechaObjeto =
    new Date(fecha)

  if (
    Number.isNaN(
      fechaObjeto.getTime()
    )
  ) {

    return fecha

  }

  return fechaObjeto.toLocaleString(
    'es-CO',
    {
      dateStyle: 'short',
      timeStyle: 'short'
    }
  )
}

</script>


<style>

body {
  margin: 0;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* =========================================================
   TARJETAS DEL RESUMEN
========================================================= */

.dashboard-card {
  border-radius: 12px;
  transition: 0.2s;
}

.dashboard-card:hover {
  transform: translateY(-2px);
}


/* =========================================================
   TARJETAS DE PEDIDOS
========================================================= */

.service-card {

  border-radius: 12px;

  overflow: hidden;

  border-left:
    5px solid #1976d2;

  transition: 0.2s;

}

.service-card:hover {

  transform:
    translateY(-1px);

  box-shadow:
    0 3px 12px
    rgba(0, 0, 0, 0.10);

}


/* =========================================================
   COLORES SEGÚN PAGO
========================================================= */

.payment-pending {
  border-left-color:
    #f44336;
}

.payment-abono {
  border-left-color:
    #ff9800;
}

.payment-paid {
  border-left-color:
    #21ba45;
}


/* =========================================================
   INFORMACIÓN
========================================================= */

.info-label {

  color:
    #757575;

  font-size:
    13px;

  margin-bottom:
    3px;

}

.info-value {

  color:
    #333333;

  font-size:
    14px;

}


/* =========================================================
   OBSERVACIONES
========================================================= */

.observation-box {

  background:
    #f5f5f5;

  border-radius:
    8px;

  padding:
    10px;

}


/* =========================================================
   CALIFICACIÓN
========================================================= */

.rating-box {

  background:
    #fff8e1;

  border-radius:
    8px;

  padding:
    10px;

  border:
    1px solid #ffe082;

}


/* =========================================================
   CAMBIO DE ESTADO
========================================================= */

.status-section {

  background:
    #fafafa;

}


/* =========================================================
   FORMULARIO
========================================================= */

.form-card {

  width:
    650px;

  max-width:
    95vw;

  border-radius:
    15px;

}


/* =========================================================
   MODAL DE CALIFICACIÓN
========================================================= */

.rating-dialog {

  width:
    430px;

  max-width:
    95vw;

  border-radius:
    15px;

}


/* =========================================================
   CONFIRMACIÓN
========================================================= */

.confirm-card {

  width:
    450px;

  max-width:
    95vw;

  border-radius:
    15px;

}


/* =========================================================
   CAMPOS
========================================================= */

.q-field__label,
.q-field__native,
.q-field__input {

  font-size:
    15px;

}


/* =========================================================
   BOTONES
========================================================= */

.q-btn {

  font-size:
    14px;

}


/* =========================================================
   MÓVIL
========================================================= */

@media (max-width: 600px) {

  .form-card {

    width:
      100%;

    max-width:
      100%;

  }


  .rating-dialog {

    width:
      100%;

    max-width:
      100%;

  }


  .q-toolbar .q-btn {

    padding-left:
      8px;

    padding-right:
      8px;

  }


  .q-toolbar .q-btn .q-btn__content {

    font-size:
      13px;

  }


  .status-section .q-btn {

    width:
      100%;

  }


  .rating-box .q-btn {

    font-size:
      12px;

  }

}

</style>
