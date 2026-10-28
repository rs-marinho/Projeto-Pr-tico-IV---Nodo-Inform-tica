(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var brl = function (n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function load(k, def) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- dados ---------- */
  var LINHAS = [
    { id: 'comp', nome: 'Computadores e notebooks', nota: 'Balcão, escritório e home office' },
    { id: 'rede', nome: 'Redes e conectividade', nota: 'Linha empresarial com VLAN' },
    { id: 'prot', nome: 'Armazenamento e proteção', nota: 'Dados guardados e energia limpa' }
  ];
  var PRODUTOS = [
    { id: 'c1', linha: 'comp', icon: 'laptop', sku: 'NB-PRO14', nome: 'Notebook Pro 14", i5, 16 GB, SSD 512 GB', desc: 'Tela Full HD, teclado com numérico reduzido e bateria para o dia todo.', specs: ['Processador Intel Core i5', 'Memória de 16 GB', 'SSD de 512 GB', 'Tela de 14 polegadas Full HD'], preco: 4290 },
    { id: 'c2', linha: 'comp', icon: 'desktop', sku: 'DT-OFFICE', nome: 'Desktop Office, i5, 8 GB, SSD 256 GB', desc: 'Torre compacta para caixa e atendimento, com Windows 11 Pro.', specs: ['Processador Intel Core i5', 'Memória de 8 GB', 'SSD de 256 GB', 'Windows 11 Pro'], preco: 2890 },
    { id: 'c3', linha: 'comp', icon: 'minipc', sku: 'MP-R5', nome: 'Mini PC Compacto, Ryzen 5, 16 GB', desc: 'Cabe atrás do monitor e gasta pouca energia. Ideal para recepção.', specs: ['Processador AMD Ryzen 5', 'Memória de 16 GB', 'Saídas HDMI e DisplayPort', 'Fixação VESA'], preco: 2390 },
    { id: 'c4', linha: 'comp', icon: 'monitor', sku: 'MN-24IPS', nome: 'Monitor 24" Full HD IPS', desc: 'Ângulo de visão aberto, entradas HDMI e DisplayPort, base ajustável.', specs: ['24 polegadas, 1920 x 1080', 'Painel IPS', 'HDMI e DisplayPort', 'Base com ajuste de altura'], preco: 849 },

    { id: 'r1', linha: 'rede', icon: 'switch', sku: 'SW-GER24', nome: 'Switch gerenciável Gigabit, 24 portas', desc: 'VLANs, controle de banda e portas sobrando para a empresa crescer.', specs: ['24 portas Gigabit', 'Gerenciável com VLAN', 'Controle de banda por porta', 'Montagem em rack 19"'], preco: 1690 },
    { id: 'r2', linha: 'rede', icon: 'ap', sku: 'AP-W6T', nome: 'Access Point Wi-Fi 6 de teto', desc: 'Rede separada para visitantes e alimentação pelo cabo de rede (PoE).', specs: ['Wi-Fi 6 dual band', 'Alimentação PoE', 'Várias redes (SSID) com VLAN', 'Instalação em teto ou parede'], preco: 780 },
    { id: 'r3', linha: 'rede', icon: 'router', sku: 'RT-DWAN', nome: 'Roteador dual WAN com VLAN', desc: 'Dois links de internet com troca automática se um cair.', specs: ['Duas portas WAN', 'Balanceamento e failover', 'Suporte a VLAN', 'Portas Gigabit'], preco: 620 },
    { id: 'r4', linha: 'rede', icon: 'cable', sku: 'CB-CAT6-305', nome: 'Cabo CAT6, caixa com 305 m', desc: 'Par trançado para pontos de rede Gigabit, com capa antichama.', specs: ['Categoria 6, 4 pares', 'Caixa com 305 metros', 'Capa antichama', 'Gigabit em até 100 m'], preco: 690 },

    { id: 'p1', linha: 'prot', icon: 'nas', sku: 'NAS-2B', nome: 'NAS de 2 baias', desc: 'Compartilha arquivos e faz backup automático. Discos vendidos à parte.', specs: ['2 baias para discos', 'Porta de rede Gigabit', 'Backup agendado', 'Discos vendidos à parte'], preco: 2190 },
    { id: 'p2', linha: 'prot', icon: 'ups', sku: 'UPS-1500S', nome: 'Nobreak senoidal 1500 VA', desc: 'Energia limpa para servidor e switch, com proteção contra queima.', specs: ['1500 VA', 'Onda senoidal pura', 'Proteção contra surtos', 'Bateria selada'], preco: 2450 },
    { id: 'p3', linha: 'prot', icon: 'ssd', sku: 'SSD-NV1T', nome: 'SSD NVMe 1 TB', desc: 'Troca o disco antigo e deixa o computador bem mais rápido.', specs: ['1 TB', 'Interface NVMe M.2', 'Leitura de até 3.000 MB/s', 'Garantia de 3 anos'], preco: 520 },
    { id: 'p4', linha: 'prot', icon: 'hdd', sku: 'HD-EXT2T', nome: 'HD externo 2 TB, USB 3.0', desc: 'Segunda mídia local para a cópia de segurança diária.', specs: ['2 TB', 'USB 3.0', 'Alimentado pela porta USB', 'Compatível com Windows, Linux e macOS'], preco: 489 }
  ];
  var DESTAQUES = ['r1', 'p2', 'c1', 'r2'];

  function findP(id) { return PRODUTOS.filter(function (p) { return p.id === id; })[0]; }
  function lineName(id) { return LINHAS.filter(function (l) { return l.id === id; })[0].nome; }

  /* ---------- ícones dos produtos ---------- */
  function switchPorts() {
    var s = '<rect x="4" y="16" width="56" height="18" rx="2"/>';
    for (var i = 0; i < 8; i++) { s += '<rect x="' + (9 + i * 6.4) + '" y="21" width="4.4" height="6" rx="0.6"/>'; }
    return s + '<path d="M8 38v4M56 38v4"/>';
  }
  var ICONS = {
    laptop: '<rect x="14" y="8" width="36" height="24" rx="2"/><path d="M6 38h52l-4 5H10z"/>',
    desktop: '<rect x="6" y="10" width="18" height="30" rx="2"/><path d="M11 16h8"/><circle cx="15" cy="34" r="1.6"/><rect x="30" y="10" width="28" height="20" rx="2"/><path d="M44 30v6M38 36h12"/>',
    minipc: '<rect x="10" y="18" width="44" height="16" rx="4"/><circle cx="19" cy="26" r="1.8"/><path d="M28 26h18M14 38h36"/>',
    monitor: '<rect x="8" y="6" width="48" height="30" rx="2"/><path d="M32 36v6M24 42h16"/>',
    'switch': switchPorts(),
    ap: '<ellipse cx="32" cy="32" rx="20" ry="7"/><path d="M22 24q10-9 20 0M26 18q6-5 12 0"/><circle cx="32" cy="32" r="1.6"/>',
    router: '<rect x="8" y="26" width="48" height="12" rx="2"/><path d="M16 26V10M48 26V10"/><circle cx="16" cy="32" r="1.4"/><circle cx="22" cy="32" r="1.4"/><path d="M36 32h14"/>',
    cable: '<circle cx="30" cy="24" r="16"/><circle cx="30" cy="24" r="8"/><path d="M46 24h12M46 28h10"/>',
    nas: '<rect x="14" y="6" width="36" height="36" rx="2"/><rect x="19" y="12" width="26" height="10" rx="1"/><rect x="19" y="26" width="26" height="10" rx="1"/><circle cx="41" cy="17" r="1.2"/><circle cx="41" cy="31" r="1.2"/>',
    ups: '<rect x="12" y="8" width="40" height="32" rx="3"/><path d="M34 14l-9 13h8l-3 11 10-14h-8z"/>',
    ssd: '<rect x="8" y="12" width="48" height="24" rx="3"/><rect x="18" y="19" width="12" height="10" rx="1"/><path d="M38 20h10M38 24h10M38 28h6"/>',
    hdd: '<rect x="12" y="6" width="40" height="36" rx="4"/><circle cx="32" cy="24" r="10"/><circle cx="32" cy="24" r="2"/><path d="M32 24l7-5"/>'
  };
  function icon(n) {
    return '<svg viewBox="0 0 64 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[n] + '</svg>';
  }
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C1 8.5 2.9 5 6.2 5c2 0 3.2 1 3.8 2 .6-1 1.8-2 3.8-2 3.3 0 5.2 3.5 3.8 6.8C19.5 16.4 12 21 12 21z"/></svg>';

  /* ---------- estado ---------- */
  var cart = load('nodo.cart', {});
  var favs = load('nodo.fav', []);
  var orders = load('nodo.orders', []);
  Object.keys(cart).forEach(function (id) { if (!findP(id) || !(cart[id] > 0)) delete cart[id]; });
  if (!Array.isArray(favs)) favs = [];
  if (!Array.isArray(orders)) orders = [];
  var state = { linha: 'todas', q: '', onlyFav: false, last: null, sheetId: null, sheetQty: 1 };

  /* ---------- utilitários ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('on'); }, 1800);
  }
  function copyEl(el, btn) {
    var txt = el.textContent, old = btn.textContent;
    function done() { btn.textContent = 'Copiado'; setTimeout(function () { btn.textContent = old; }, 1600); }
    function fallback() {
      try {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        btn.textContent = 'Selecionado, copie'; setTimeout(function () { btn.textContent = old; }, 2400);
      } catch (e) {}
    }
    try { navigator.clipboard.writeText(txt).then(done, fallback); } catch (e) { fallback(); }
  }
  function cartInfo() {
    var t = 0, n = 0;
    Object.keys(cart).forEach(function (id) { t += findP(id).preco * cart[id]; n += cart[id]; });
    return { total: t, count: n };
  }

  /* ---------- telas ---------- */
  var ROUTES = ['inicio', 'catalogo', 'pedido', 'conta'];
  var TITLES = { inicio: 'Início', catalogo: 'Catálogo', pedido: 'Pedido', conta: 'Conta' };
  function show(name) {
    if (ROUTES.indexOf(name) === -1) name = 'inicio';
    ROUTES.forEach(function (r) {
      $('#tela-' + r).hidden = r !== name;
      var b = $('#n-' + r);
      if (r === name) { b.setAttribute('aria-current', 'page'); } else { b.removeAttribute('aria-current'); }
    });
    $('#screenName').textContent = TITLES[name];
    if (name === 'catalogo') renderCatalog();
    if (name === 'pedido') renderCart();
    if (name === 'conta') renderOrders();
  }
  function go(name, anchor) {
    closeSheet();
    if (location.hash === '#' + name) { show(name); } else { location.hash = name; }
    window.scrollTo(0, 0);
    if (anchor) { setTimeout(function () { var a = document.getElementById(anchor); if (a) a.scrollIntoView({ block: 'start' }); }, 40); }
  }
  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });

  /* ---------- início ---------- */
  var lit = { 0: 'on', 1: 'on', 2: 'ok', 4: 'on', 5: 'ok', 7: 'on', 8: 'on', 11: 'ok', 13: 'ok', 14: 'on', 16: 'on', 19: 'ok', 20: 'on', 22: 'on' };
  [['portsA', 0], ['portsB', 12]].forEach(function (p) {
    var h = '';
    for (var i = 0; i < 12; i++) { h += '<span class="port ' + (lit[p[1] + i] || '') + '"></span>'; }
    $('#' + p[0]).innerHTML = h;
  });
  function renderHome() {
    $('#featured').innerHTML = DESTAQUES.map(function (id) {
      var p = findP(id);
      return '<button type="button" class="hcard" data-open="' + p.id + '"><div class="ptile">' + icon(p.icon) + '</div>' +
        '<div class="hb"><span class="sku">' + esc(p.sku) + '</span><strong>' + esc(p.nome) + '</strong></div>' +
        '<div class="pprice">' + brl(p.preco) + '</div></button>';
    }).join('');
    $('#lines').innerHTML = LINHAS.map(function (l) {
      return '<button type="button" class="line" data-line="' + l.id + '"><h3>' + esc(l.nome) + '</h3><span>' + esc(l.nota) + '. 4 produtos.</span></button>';
    }).join('');
    var c = cartInfo();
    $('#shortCart').textContent = c.count ? c.count + (c.count === 1 ? ' item, ' : ' itens, ') + brl(c.total) : 'Carrinho vazio';
  }

  /* ---------- catálogo ---------- */
  function renderChips() {
    var items = [{ id: 'todas', nome: 'Todas' }].concat(LINHAS).concat([{ id: 'fav', nome: 'Favoritos' }]);
    $('#chips').innerHTML = items.map(function (l) {
      var on = l.id === 'fav' ? state.onlyFav : (!state.onlyFav && state.linha === l.id);
      return '<button type="button" class="chip" data-chip="' + l.id + '" aria-pressed="' + on + '">' + esc(l.nome) + '</button>';
    }).join('');
  }
  function matches(p) {
    if (state.onlyFav && favs.indexOf(p.id) === -1) return false;
    if (!state.onlyFav && state.linha !== 'todas' && p.linha !== state.linha) return false;
    if (!state.q) return true;
    return (p.nome + ' ' + p.desc + ' ' + p.sku).toLowerCase().indexOf(state.q.toLowerCase()) !== -1;
  }
  function rowHtml(p) {
    var f = favs.indexOf(p.id) !== -1;
    return '<div class="prow" data-open="' + p.id + '" role="button" tabindex="0" aria-label="Ver detalhes de ' + esc(p.nome) + '">' +
      '<div class="ptile">' + icon(p.icon) + '</div>' +
      '<div class="pinfo"><span class="sku">' + esc(p.sku) + '</span><strong>' + esc(p.nome) + '</strong><span class="pprice">' + brl(p.preco) + '</span></div>' +
      '<div class="pact"><button class="iconbtn' + (f ? ' on' : '') + '" type="button" data-fav="' + p.id + '" aria-pressed="' + f + '" aria-label="' + (f ? 'Remover dos favoritos' : 'Favoritar') + '">' + HEART + '</button>' +
      '<button class="btn small" type="button" data-add="' + p.id + '">Adicionar ao pedido</button></div></div>';
  }
  function renderCatalog() {
    renderChips();
    $('#q').value = state.q;
    var html = '', any = false;
    LINHAS.forEach(function (l) {
      var list = PRODUTOS.filter(function (p) { return p.linha === l.id && matches(p); });
      if (!list.length) return;
      any = true;
      html += '<div class="group-head"><h2>' + esc(l.nome) + '</h2><p>' + list.length + (list.length === 1 ? ' produto' : ' produtos') + '</p></div>' + list.map(rowHtml).join('');
    });
    if (!any) {
      html = '<div class="empty"><b>' + (state.onlyFav ? 'Nenhum favorito ainda' : 'Nada encontrado') + '</b><p>' +
        (state.onlyFav ? 'Toque no coração de um produto para guardá-lo aqui.' : 'Tente outra palavra ou escolha outra linha.') + '</p></div>';
    }
    $('#list').innerHTML = html;
  }

  /* ---------- ficha do produto ---------- */
  function openSheet(id) {
    var p = findP(id); if (!p) return;
    state.sheetId = id; state.sheetQty = 1;
    $('#sheetBody').innerHTML =
      '<div class="sheet-tile">' + icon(p.icon) + '</div>' +
      '<span class="sku">' + esc(p.sku) + ' · ' + esc(lineName(p.linha)) + '</span>' +
      '<h2>' + esc(p.nome) + '</h2>' +
      '<p class="prose">' + esc(p.desc) + '</p>' +
      '<ul class="specs">' + p.specs.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
      '<div class="pprice" style="font-size:1.5rem">' + brl(p.preco) + '</div>' +
      '<p class="prose small" style="margin-top:4px">ou 10x de ' + brl(p.preco / 10) + '</p>' +
      '<div class="sheet-foot"><div class="qty"><button type="button" data-sq="-1" aria-label="Diminuir quantidade">−</button><span id="sheetQty">1</span><button type="button" data-sq="1" aria-label="Aumentar quantidade">+</button></div>' +
      '<button class="btn" type="button" id="sheetAdd">Adicionar · ' + brl(p.preco) + '</button></div>';
    $('#sheetWrap').hidden = false;
    $('#sheetClose').focus();
  }
  function closeSheet() { $('#sheetWrap').hidden = true; state.sheetId = null; }

  /* ---------- pedido ---------- */
  function addToCart(id, q) {
    cart[id] = (cart[id] || 0) + q;
    save('nodo.cart', cart); renderBadge(); renderHome();
  }
  function renderBadge() {
    var c = cartInfo(), b = $('#badge');
    b.textContent = c.count; b.hidden = !c.count;
  }
  function renderCart() {
    var ids = Object.keys(cart), c = cartInfo();
    $('#doneView').hidden = !state.last;
    $('#cartView').hidden = !!state.last;
    if (state.last) return;
    $('#cartEmpty').hidden = ids.length > 0;
    $('#cartFull').hidden = ids.length === 0;
    $('#orderList').innerHTML = ids.map(function (id) {
      var p = findP(id), q = cart[id];
      return '<div class="order-item"><div class="nm"><strong>' + esc(p.nome) + '</strong><div class="sku">' + esc(p.sku) + '</div></div>' +
        '<div class="qty"><button type="button" data-dec="' + id + '" aria-label="Diminuir quantidade">−</button><span>' + q + '</span><button type="button" data-inc="' + id + '" aria-label="Aumentar quantidade">+</button></div>' +
        '<div class="sub">' + brl(p.preco * q) + '</div></div>';
    }).join('');
    $('#totalVal').textContent = brl(c.total);
  }
  function orderMessage(o) {
    var lines = ['Pedido ' + o.n, 'Cliente: ' + o.nome, 'Telefone: ' + o.tel, 'Recebimento: ' + o.ent, 'Pagamento: ' + o.pag, ''];
    o.itens.forEach(function (i) {
      var p = findP(i.id);
      lines.push(i.q + 'x ' + p.nome + ' (' + p.sku + ') - ' + brl(p.preco * i.q));
    });
    lines.push('', 'Total: ' + brl(o.total));
    return lines.join('\n');
  }
  $('#orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = $('#f-nome').value.trim(), tel = $('#f-tel').value.trim();
    var digits = tel.replace(/\D/g, '');
    $('#e-nome').textContent = nome ? '' : 'Informe seu nome ou o da empresa.';
    $('#e-tel').textContent = digits.length >= 10 ? '' : 'Informe o telefone com DDD, por exemplo (51) 90000-0000.';
    if (!nome || digits.length < 10) return;
    var o = {
      n: 'NODO-' + String(Date.now()).slice(-6),
      data: new Date().toISOString(),
      nome: nome, tel: tel, ent: $('#f-ent').value, pag: $('#f-pag').value,
      itens: Object.keys(cart).map(function (id) { return { id: id, q: cart[id] }; }),
      total: cartInfo().total
    };
    orders.unshift(o); save('nodo.orders', orders);
    cart = {}; save('nodo.cart', cart);
    state.last = o;
    $('#doneNum').textContent = o.n;
    $('#doneText').textContent = orderMessage(o);
    renderBadge(); renderHome(); renderCart();
    window.scrollTo(0, 0);
    toast('Pedido registrado');
  });

  /* ---------- conta ---------- */
  function renderOrders() {
    if (!orders.length) {
      $('#orders').innerHTML = '<div class="empty"><b>Nenhum pedido ainda</b><p>Os pedidos registrados neste aparelho aparecem aqui.</p></div>';
      return;
    }
    $('#orders').innerHTML = orders.map(function (o) {
      var q = o.itens.reduce(function (s, i) { return s + i.q; }, 0);
      var d = new Date(o.data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
      return '<div class="ord"><div class="ord-top"><b>' + esc(o.n) + '</b><span class="pill">Registrado</span></div>' +
        '<small>' + esc(d) + ' · ' + q + (q === 1 ? ' item' : ' itens') + ' · ' + esc(o.pag) + '</small>' +
        '<strong>' + brl(o.total) + '</strong></div>';
    }).join('');
  }

  /* ---------- eventos ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go],[data-add],[data-fav],[data-open],[data-chip],[data-line],[data-inc],[data-dec],[data-sq],[data-copy],[data-close],#sheetAdd,#sheetClose,#copyOrder,#keepShopping,#installBtn');
    if (!el) return;
    if (el.dataset.go) { go(el.dataset.go, el.dataset.anchor); return; }
    if (el.dataset.add) { addToCart(el.dataset.add, 1); toast('Adicionado ao pedido'); return; }
    if (el.dataset.fav) {
      var i = favs.indexOf(el.dataset.fav);
      if (i === -1) favs.push(el.dataset.fav); else favs.splice(i, 1);
      save('nodo.fav', favs); renderCatalog(); return;
    }
    if (el.dataset.open) { openSheet(el.dataset.open); return; }
    if (el.dataset.chip) {
      if (el.dataset.chip === 'fav') { state.onlyFav = !state.onlyFav; } else { state.onlyFav = false; state.linha = el.dataset.chip; }
      renderCatalog(); return;
    }
    if (el.dataset.line) { state.linha = el.dataset.line; state.onlyFav = false; state.q = ''; go('catalogo'); return; }
    if (el.dataset.inc) { cart[el.dataset.inc]++; save('nodo.cart', cart); renderBadge(); renderCart(); renderHome(); return; }
    if (el.dataset.dec) { cart[el.dataset.dec]--; if (cart[el.dataset.dec] <= 0) delete cart[el.dataset.dec]; save('nodo.cart', cart); renderBadge(); renderCart(); renderHome(); return; }
    if (el.dataset.sq) { state.sheetQty = Math.max(1, Math.min(99, state.sheetQty + parseInt(el.dataset.sq, 10))); $('#sheetQty').textContent = state.sheetQty; return; }
    if (el.dataset.copy) { copyEl($('#' + el.dataset.copy), el); return; }
    if (el.dataset.close || el.id === 'sheetClose') { closeSheet(); return; }
    if (el.id === 'sheetAdd') { addToCart(state.sheetId, state.sheetQty); closeSheet(); toast('Adicionado ao pedido'); return; }
    if (el.id === 'copyOrder') { copyEl($('#doneText'), el); return; }
    if (el.id === 'keepShopping') { state.last = null; go('catalogo'); return; }
    if (el.id === 'installBtn' && deferred) { deferred.prompt(); deferred = null; el.hidden = true; return; }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSheet();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('prow')) {
      e.preventDefault(); openSheet(e.target.dataset.open);
    }
  });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value.trim(); var pos = e.target.selectionStart; renderCatalogKeepFocus(pos); });
  function renderCatalogKeepFocus(pos) {
    renderCatalog();
    var q = $('#q'); q.focus();
    try { q.setSelectionRange(pos, pos); } catch (err) {}
  }
  $('#homeSearch').addEventListener('submit', function (e) {
    e.preventDefault();
    state.q = $('#homeQ').value.trim(); state.onlyFav = false; state.linha = 'todas';
    go('catalogo');
  });

  /* instalação (Android/Chrome) */
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; $('#installBtn').hidden = false; });

  /* ---------- início ---------- */
  renderHome(); renderBadge();
  show(location.hash.slice(1));
})();
