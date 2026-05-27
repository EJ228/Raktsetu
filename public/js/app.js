/* RaktSetu — client-side bootstrap. Plain JS, no bundler. */
(function () {
    'use strict';

    // ----- Auto-dismiss flash messages after 4s -----
    document.querySelectorAll('[data-flash]').forEach(function (el) {
        setTimeout(function () { el.style.transition = 'opacity 0.4s ease'; el.style.opacity = '0'; }, 3600);
        setTimeout(function () { el.remove(); }, 4100);
    });

    // ----- Register page: switch role-specific form fields -----
    var roleRadios = document.querySelectorAll('input[name="role"]');
    if (roleRadios.length) {
        function syncRole() {
            var selected = document.querySelector('input[name="role"]:checked');
            if (!selected) return;
            ['donor', 'requester', 'bank_admin'].forEach(function (r) {
                var pane = document.querySelector('[data-role-pane="' + r + '"]');
                if (!pane) return;
                var isActive = (r === selected.value);
                pane.classList.toggle('hidden', !isActive);
                // Disable inputs in hidden panes so duplicate field names
                // (e.g. 'city' in both donor and requester panes) don't
                // get submitted as arrays, which breaks Mongoose validation.
                pane.querySelectorAll('input, select, textarea').forEach(function (el) {
                    el.disabled = !isActive;
                });
            });
            // Update role card visuals
            document.querySelectorAll('[data-role-card]').forEach(function (card) {
                var isSel = card.getAttribute('data-role-card') === selected.value;
                card.style.borderColor = isSel ? '#C8232C' : '#E5E7EB';
                card.style.background  = isSel ? '#FCE9EA' : 'white';
            });
        }
        roleRadios.forEach(function (r) { r.addEventListener('change', syncRole); });
        syncRole();
    }

    // ----- Simple tab-switcher for "data-tabset" containers -----
    document.querySelectorAll('[data-tabset]').forEach(function (set) {
        set.querySelectorAll('[data-tab]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var name = btn.getAttribute('data-tab');
                set.querySelectorAll('[data-tab]').forEach(function (b) {
                    b.classList.toggle('rs-tab-on', b === btn);
                });
                set.querySelectorAll('[data-tab-pane]').forEach(function (p) {
                    p.classList.toggle('hidden', p.getAttribute('data-tab-pane') !== name);
                });
            });
        });
    });

    // ----- Multi-step form for create-request -----
    (function setupSteps() {
        var stepper = document.querySelector('[data-stepper]');
        if (!stepper) return;
        var form   = stepper.closest('form') || stepper;
        var steps  = stepper.querySelectorAll('[data-step]');
        var dots   = stepper.querySelectorAll('[data-step-dot]');
        var current = 0;

        // Prevent browser from validating hidden steps on submit.
        // We handle per-step validation manually below.
        if (form.tagName === 'FORM') form.noValidate = true;

        function show(i) {
            current = Math.max(0, Math.min(steps.length - 1, i));
            steps.forEach(function (s, idx) { s.classList.toggle('hidden', idx !== current); });
            dots.forEach(function (d, idx) {
                d.classList.remove('rs-step-done', 'rs-step-active', 'rs-step-pending');
                if (idx < current) d.classList.add('rs-step-done');
                else if (idx === current) d.classList.add('rs-step-active');
                else d.classList.add('rs-step-pending');
            });
            stepper.querySelectorAll('[data-step-prev]').forEach(function (b) { b.style.visibility = current === 0 ? 'hidden' : 'visible'; });
            stepper.querySelectorAll('[data-step-next]').forEach(function (b) {
                var isLast = current === steps.length - 1;
                var icon = b.querySelector('svg');
                b.type = isLast ? 'submit' : 'button';
                // Set text while preserving the icon
                if (icon) { b.textContent = isLast ? 'Submit request ' : 'Continue '; b.appendChild(icon); }
                else { b.textContent = isLast ? 'Submit request' : 'Continue'; }
            });
            var counter = stepper.querySelector('[data-step-counter]');
            if (counter) counter.textContent = 'Step ' + (current + 1) + ' of ' + steps.length;
        }

        // Validate only the current step's required fields before advancing.
        function validateCurrentStep() {
            var fields = steps[current].querySelectorAll('[required]');
            for (var i = 0; i < fields.length; i++) {
                if (!fields[i].value || !fields[i].value.trim()) {
                    fields[i].focus();
                    fields[i].reportValidity();
                    return false;
                }
            }
            return true;
        }

        stepper.querySelectorAll('[data-step-next]').forEach(function (b) {
            b.addEventListener('click', function (e) {
                if (current === steps.length - 1) {
                    // Last step — validate and let form submit
                    if (!validateCurrentStep()) { e.preventDefault(); }
                    return;
                }
                e.preventDefault();
                if (validateCurrentStep()) show(current + 1);
            });
        });
        stepper.querySelectorAll('[data-step-prev]').forEach(function (b) {
            b.addEventListener('click', function (e) { e.preventDefault(); show(current - 1); });
        });
        show(0);
    })();

    // ----- Urgency radio card visual feedback -----
    document.querySelectorAll('input[name="urgency"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            // Update all urgency cards — active gets red border, others grey
            document.querySelectorAll('input[name="urgency"]').forEach(function (r) {
                var card = r.closest('label');
                if (card) card.style.borderColor = r.checked ? '#C8232C' : '#E5E7EB';
            });
        });
    });

    // ----- Component card switching -----
    document.querySelectorAll('[data-component-card]').forEach(function (card) {
        card.addEventListener('click', function () {
            document.querySelectorAll('[data-component-card]').forEach(function (c) {
                var radio = c.querySelector('input[type="radio"]');
                c.style.borderColor = radio && radio.checked ? '#C8232C' : '#E5E7EB';
            });
        });
    });

    // ----- Unit +/- stepper -----
    var unitDec = document.querySelector('[data-unit-dec]');
    var unitInc = document.querySelector('[data-unit-inc]');
    if (unitDec && unitInc) {
        var unitInput = unitDec.parentElement.querySelector('input[name="unitsNeeded"]');
        unitDec.addEventListener('click', function () {
            var v = parseInt(unitInput.value, 10);
            if (v > 1) unitInput.value = v - 1;
        });
        unitInc.addEventListener('click', function () {
            var v = parseInt(unitInput.value, 10);
            if (v < 20) unitInput.value = v + 1;
        });
    }

    // ----- Socket.io: live request status -----
    if (typeof io !== 'undefined') {
        var socket = io();

        // Requester / donor — single request page
        var reqIdEl = document.querySelector('[data-request-id]');
        if (reqIdEl) {
            var reqId = reqIdEl.getAttribute('data-request-id');
            socket.emit('join', 'request_' + reqId);
            socket.on('requestUpdated', function (data) {
                if (String(data.id) === String(reqId)) {
                    var badge = document.querySelector('[data-request-status]');
                    if (badge) badge.textContent = data.status;
                    var banner = document.querySelector('[data-live-banner]');
                    if (banner) {
                        banner.textContent = 'Status updated → ' + data.status;
                        banner.classList.remove('hidden');
                        setTimeout(function () { banner.classList.add('hidden'); }, 4000);
                    }
                }
            });
        }

        // Bank admin — listen for new requests / pledges
        var bankIdEl = document.querySelector('[data-bank-id]');
        if (bankIdEl) {
            socket.emit('join', 'bank_' + bankIdEl.getAttribute('data-bank-id'));
            socket.on('bankNotification', function (data) {
                var dot = document.querySelector('[data-live-dot]');
                if (dot) dot.classList.add('rs-pulse');
            });
        }

        // Donor — urgent request alerts (subscribed by group + city)
        var donorGroup = document.body.getAttribute('data-donor-group');
        var donorCity  = document.body.getAttribute('data-donor-city');
        if (donorGroup && donorCity) {
            socket.emit('join', 'donors_' + donorGroup + '_' + donorCity);
            socket.on('urgentRequest', function () {
                var dot = document.querySelector('[data-live-dot]');
                if (dot) dot.classList.add('rs-pulse');
            });
        }
    }

    // ----- Profile page: tab switching -----
    var tabSet = document.querySelector('[data-tab-set]');
    if (tabSet) {
        var tabBtns = tabSet.querySelectorAll('[data-tab]');
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-tab');
                tabBtns.forEach(function (b) {
                    b.classList.toggle('text-ink', b === btn);
                    b.classList.toggle('border-ink', b === btn);
                    b.classList.toggle('text-[#6B7280]', b !== btn);
                    b.classList.toggle('border-transparent', b !== btn);
                });
                document.querySelectorAll('[data-tab-pane]').forEach(function (pane) {
                    pane.classList.toggle('hidden', pane.getAttribute('data-tab-pane') !== target);
                });
            });
        });
    }
})();
