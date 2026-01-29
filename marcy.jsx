{
  function buildUI(thisObj) {
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "marcyaep", undefined, { resizeable: true });
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 8;
    win.margins = 12;

    /* logo */
    var logoFile = new File("./icon.png");
    if (logoFile.exists) {
      var logoGroup = win.add("group");
      logoGroup.alignment = ["fill", "top"];
      logoGroup.alignChildren = ["center", "center"];
    }
    var logoImg = logoGroup.add(
      "image",
      undefined,
      ScriptUI.newImage(logoFile.fsName)
    );
    // 可選：限制顯示大小（依你的 logo 比例調）
    logoImg.preferredSize = [509, 186];

    // =================================================
    //                 1. TOP: TEXT & FX
    // =================================================
    var topPanel = win.add("panel", undefined, "Create & Effects");
    topPanel.orientation = "column";
    topPanel.alignChildren = ["fill", "top"];
    topPanel.spacing = 4;
    topPanel.margins = 8;

    // Row 1: Text Gen
    var btnGroup = topPanel.add("group");
    btnGroup.orientation = "row";
    btnGroup.alignChildren = ["fill", "fill"];
    btnGroup.spacing = 4;
    var btnEN = btnGroup.add("button", undefined, "EN");
    var btnJP = btnGroup.add("button", undefined, "JP");
    var btnSUB = btnGroup.add("button", undefined, "SUB");

    // Row 2: Effects
    var effectGroup = topPanel.add("group");
    effectGroup.orientation = "row";
    effectGroup.alignChildren = ["fill", "fill"];
    effectGroup.spacing = 4;
    var btnFill = effectGroup.add("button", undefined, "Fill");
    var btnGradient = effectGroup.add("button", undefined, "Grad");
    var btnBox = effectGroup.add("button", undefined, "Box");
    var btnClean = effectGroup.add("button", undefined, "Clean");

    // =================================================
    //           2. MIDDLE: ALIGN & ANCHOR
    // =================================================
    var middleGroup = win.add("group");
    middleGroup.orientation = "row";
    middleGroup.alignChildren = ["fill", "top"]; // Fill height
    middleGroup.spacing = 8;

    // --- LEFT: ALIGN ---
    var alignPanel = middleGroup.add("panel", undefined, "Align");
    alignPanel.orientation = "column";
    alignPanel.alignChildren = ["fill", "top"];
    alignPanel.spacing = 4;
    alignPanel.margins = 8;
    // Make align panel take up roughly 60% space or fixed width
    alignPanel.preferredSize.width = 160;

    // Align To
    var alignDropdown = alignPanel.add("dropdownlist", undefined, [
      "Selection",
      "Composition",
    ]);
    alignDropdown.selection = 0;
    alignDropdown.alignment = ["fill", "top"];

    // Helper to create square icon buttons
    function addIconBtn(grp, txt, w) {
      var b = grp.add("button", undefined, txt);
      b.preferredSize = [w, 25]; // Fixed square-ish size
      return b;
    }

    // Align Buttons
    var alignRow1 = alignPanel.add("group");
    alignRow1.orientation = "row";
    alignRow1.alignChildren = ["fill", "fill"];
    alignRow1.spacing = 2;
    var btnAlignLeft = addIconBtn(alignRow1, "|←", 45);
    var btnAlignHCenter = addIconBtn(alignRow1, "→|←", 45);
    var btnAlignRight = addIconBtn(alignRow1, "→|", 45);

    var alignRow2 = alignPanel.add("group");
    alignRow2.orientation = "row";
    alignRow2.alignChildren = ["fill", "fill"];
    alignRow2.spacing = 2;
    var btnAlignTop = addIconBtn(alignRow2, "Top", 45);
    var btnAlignVCenter = addIconBtn(alignRow2, "Mid", 45);
    var btnAlignBottom = addIconBtn(alignRow2, "Bot", 45);

    // Distribute
    var distRow = alignPanel.add("group");
    distRow.orientation = "row";
    distRow.alignChildren = ["fill", "fill"];
    distRow.spacing = 2;
    var btnDistH = distRow.add("button", undefined, "||| Dist");
    var btnDistV = distRow.add("button", undefined, "≡ Dist");

    // --- RIGHT: ANCHOR & PARA ---
    var rightPanel = middleGroup.add("panel", undefined, "Anchor/Para");
    rightPanel.orientation = "column";
    rightPanel.alignChildren = ["center", "top"];
    rightPanel.spacing = 6;
    rightPanel.margins = 8;
    rightPanel.preferredSize.width = 100;

    // Anchor Grid (3x3)
    var anchorGrid = rightPanel.add("group");
    anchorGrid.orientation = "column";
    anchorGrid.spacing = 2;

    var btnSize = [25, 25]; // Perfectly square buttons

    var r1 = anchorGrid.add("group");
    r1.spacing = 2;
    var btnTL = r1.add("button", undefined, "◤");
    btnTL.preferredSize = btnSize;
    var btnTM = r1.add("button", undefined, "▲");
    btnTM.preferredSize = btnSize;
    var btnTR = r1.add("button", undefined, "◥");
    btnTR.preferredSize = btnSize;

    var r2 = anchorGrid.add("group");
    r2.spacing = 2;
    var btnML = r2.add("button", undefined, "◀");
    btnML.preferredSize = btnSize;
    var btnMM = r2.add("button", undefined, "●");
    btnMM.preferredSize = btnSize;
    var btnMR = r2.add("button", undefined, "▶");
    btnMR.preferredSize = btnSize;

    var r3 = anchorGrid.add("group");
    r3.spacing = 2;
    var btnBL = r3.add("button", undefined, "◣");
    btnBL.preferredSize = btnSize;
    var btnBM = r3.add("button", undefined, "▼");
    btnBM.preferredSize = btnSize;
    var btnBR = r3.add("button", undefined, "◢");
    btnBR.preferredSize = btnSize;

    // Paragraph (3 buttons)
    rightPanel.add("panel", [0, 0, 90, 2]); // Divider line

    var paraGroup = rightPanel.add("group");
    paraGroup.spacing = 2;
    var btnParaLeft = paraGroup.add("button", undefined, "L");
    btnParaLeft.preferredSize = btnSize;
    var btnParaCenter = paraGroup.add("button", undefined, "C");
    btnParaCenter.preferredSize = btnSize;
    var btnParaRight = paraGroup.add("button", undefined, "R");
    btnParaRight.preferredSize = btnSize;

    btnParaLeft.helpTip = "Left Justify";
    btnParaCenter.helpTip = "Center Justify";
    btnParaRight.helpTip = "Right Justify";

    // =================================================
    //                 3. TOOLS (BOTTOM)
    // =================================================
    var toolsPanel = win.add("panel", undefined, "Tools");
    toolsPanel.orientation = "column";
    toolsPanel.alignChildren = ["fill", "top"];
    toolsPanel.spacing = 6;
    toolsPanel.margins = 10;

    // Row 1: Settings
    var settingsRow = toolsPanel.add("group");
    settingsRow.orientation = "row";
    settingsRow.alignChildren = ["left", "center"];
    settingsRow.spacing = 10;

    // Color
    var colGrp = settingsRow.add("group");
    colGrp.add("statictext", undefined, "Color:");
    var labelColors = [
      "None",
      "Red",
      "Yellow",
      "Orange",
      "Brown",
      "Green",
      "Blue",
      "Violet",
      "Fuchsia",
    ];
    var colorDropdown = colGrp.add("dropdownlist", undefined, labelColors);
    colorDropdown.selection = 0;
    colorDropdown.preferredSize.width = 70;

    // Qty
    var qtyGrp = settingsRow.add("group");
    qtyGrp.add("statictext", undefined, "Qty:");
    var qtyItems = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    var qtyDropdown = qtyGrp.add("dropdownlist", undefined, qtyItems);
    qtyDropdown.selection = 0;
    qtyDropdown.preferredSize.width = 40;

    var chkSeparate = settingsRow.add("checkbox", undefined, "Sep(PreC)");
    chkSeparate.value = true;

    // Row 2 & 3: Action Buttons (Grid Layout)
    // Helper for neat rows
    function addActionRow(parent) {
      var g = parent.add("group");
      g.orientation = "row";
      g.alignChildren = ["fill", "fill"];
      g.spacing = 4;
      return g;
    }

    var rowA = addActionRow(toolsPanel);
    var btnPrecomp = rowA.add("button", undefined, "Pre-C");
    var btnNull = rowA.add("button", undefined, "Null");
    var btnAdj = rowA.add("button", undefined, "Adj");
    var btnSep = rowA.add("button", undefined, "Sep XY");

    var rowB = addActionRow(toolsPanel);
    var btnSolid = rowB.add("button", undefined, "Solid");
    var btnCamera = rowB.add("button", undefined, "Cam");
    var btnLight = rowB.add("button", undefined, "Light");
    var btnCrop = rowB.add("button", undefined, "Auto Crop");

    // =================================================
    //                 LOGIC SECTION
    // =================================================

    // --- 1. Paragraph Logic ---
    function setParagraph(justification) {
      var comp = app.project.activeItem;
      if (!comp || comp.selectedLayers.length === 0) return;
      app.beginUndoGroup("Set Paragraph");
      for (var i = 0; i < comp.selectedLayers.length; i++) {
        var layer = comp.selectedLayers[i];
        if (layer instanceof TextLayer) {
          var textProp = layer.property("Source Text");
          var textDoc = textProp.value;
          textDoc.justification = justification;
          textProp.setValue(textDoc);
        }
      }
      app.endUndoGroup();
    }

    // --- 2. Anchor Point Logic ---
    function setAnchor(pos) {
      var comp = app.project.activeItem;
      if (!comp || comp.selectedLayers.length === 0) return;
      app.beginUndoGroup("Set Anchor Point");
      for (var i = 0; i < comp.selectedLayers.length; i++) {
        var layer = comp.selectedLayers[i];
        if (
          !(layer instanceof AVLayer) &&
          !(layer instanceof ShapeLayer) &&
          !(layer instanceof TextLayer)
        )
          continue;

        var r = layer.sourceRectAtTime(comp.time, false);
        var newX = 0,
          newY = 0;
        if (pos.indexOf("L") !== -1) newX = r.left;
        else if (pos.indexOf("R") !== -1) newX = r.left + r.width;
        else newX = r.left + r.width / 2;

        if (pos.indexOf("T") !== -1) newY = r.top;
        else if (pos.indexOf("B") !== -1) newY = r.top + r.height;
        else newY = r.top + r.height / 2;

        var newAnchor = [newX, newY];
        if (layer.transform.anchorPoint.value.length > 2)
          newAnchor.push(layer.transform.anchorPoint.value[2]);
        moveAnchorVisualLock(layer, newAnchor);
      }
      app.endUndoGroup();
    }

    function moveAnchorVisualLock(layer, targetAnchor) {
      var curAnchor = layer.transform.anchorPoint.value;
      var curPos = layer.transform.position.value;
      var delta = [
        targetAnchor[0] - curAnchor[0],
        targetAnchor[1] - curAnchor[1],
      ];
      var s = layer.transform.scale.value;
      var sx = s[0] / 100;
      var sy = s[1] / 100;
      var dx = delta[0] * sx;
      var dy = delta[1] * sy;
      var ang = layer.transform.rotation.value;
      var rad = ang * (Math.PI / 180);
      var cos = Math.cos(rad);
      var sin = Math.sin(rad);
      var moveX = dx * cos - dy * sin;
      var moveY = dx * sin + dy * cos;

      var p = layer.transform.position;
      if (p.dimensionsSeparated) {
        p.property(0).setValue(curPos[0] + moveX);
        p.property(1).setValue(curPos[1] + moveY);
      } else {
        if (curPos.length === 2)
          p.setValue([curPos[0] + moveX, curPos[1] + moveY]);
        else p.setValue([curPos[0] + moveX, curPos[1] + moveY, curPos[2]]);
      }
      layer.transform.anchorPoint.setValue(targetAnchor);
    }

    // --- 3. Align Logic ---
    function getLayerEdge(layer, type) {
      if (
        !(layer instanceof AVLayer) &&
        !(layer instanceof ShapeLayer) &&
        !(layer instanceof TextLayer)
      ) {
        var p = layer.transform.position.value;
        if (type.match(/left|right|hCenter/)) return p[0];
        else return p[1];
      }
      var r = layer.sourceRectAtTime(layer.containingComp.time, false);
      var s = layer.transform.scale.value;
      var sx = s[0] / 100;
      var sy = s[1] / 100;
      var p = layer.transform.position.value;
      var a = layer.transform.anchorPoint.value;
      var left = p[0] - a[0] * sx + r.left * sx;
      var top = p[1] - a[1] * sy + r.top * sy;
      var right = left + r.width * sx;
      var bottom = top + r.height * sy;
      var hCenter = left + (r.width * sx) / 2;
      var vCenter = top + (r.height * sy) / 2;
      switch (type) {
        case "left":
          return left;
        case "right":
          return right;
        case "top":
          return top;
        case "bottom":
          return bottom;
        case "hCenter":
          return hCenter;
        case "vCenter":
          return vCenter;
        default:
          return 0;
      }
    }

    function shiftLayer(layer, dx, dy) {
      var p = layer.transform.position;
      if (p.dimensionsSeparated) {
        if (dx !== 0) {
          var px = p.property(0);
          if (px.numKeys > 0)
            for (var k = 1; k <= px.numKeys; k++)
              px.setValueAtKey(k, px.keyValue(k) + dx);
          else px.setValue(px.value + dx);
        }
        if (dy !== 0) {
          var py = p.property(1);
          if (py.numKeys > 0)
            for (var k = 1; k <= py.numKeys; k++)
              py.setValueAtKey(k, py.keyValue(k) + dy);
          else py.setValue(py.value + dy);
        }
      } else {
        if (p.numKeys > 0)
          for (var k = 1; k <= p.numKeys; k++) {
            var v = p.keyValue(k);
            p.setValueAtKey(k, [v[0] + dx, v[1] + dy, v[2]]);
          }
        else {
          var cur = p.value;
          p.setValue([cur[0] + dx, cur[1] + dy, cur[2]]);
        }
      }
    }

    function runAlign(mode) {
      var comp = app.project.activeItem;
      if (!comp || comp.selectedLayers.length === 0)
        return alert("Select layers!");
      app.beginUndoGroup("Align");
      try {
        var sel = comp.selectedLayers;
        var isSelectionMode = alignDropdown.selection.index === 0;
        var target = 0;
        if (isSelectionMode) {
          var values = [];
          for (var i = 0; i < sel.length; i++)
            values.push(getLayerEdge(sel[i], mode));
          if (mode === "left" || mode === "top")
            target = Math.min.apply(null, values);
          else if (mode === "right" || mode === "bottom")
            target = Math.max.apply(null, values);
          else {
            var minE = Infinity,
              maxE = -Infinity;
            for (var i = 0; i < sel.length; i++) {
              var e1, e2;
              if (mode === "hCenter") {
                e1 = getLayerEdge(sel[i], "left");
                e2 = getLayerEdge(sel[i], "right");
              } else {
                e1 = getLayerEdge(sel[i], "top");
                e2 = getLayerEdge(sel[i], "bottom");
              }
              if (e1 < minE) minE = e1;
              if (e2 > maxE) maxE = e2;
            }
            target = (minE + maxE) / 2;
          }
        } else {
          if (mode === "left" || mode === "top") target = 0;
          else if (mode === "right") target = comp.width;
          else if (mode === "bottom") target = comp.height;
          else if (mode === "hCenter") target = comp.width / 2;
          else if (mode === "vCenter") target = comp.height / 2;
        }
        for (var i = 0; i < sel.length; i++) {
          var diff = target - getLayerEdge(sel[i], mode);
          if (mode.match(/left|right|hCenter/)) shiftLayer(sel[i], diff, 0);
          else shiftLayer(sel[i], 0, diff);
        }
      } catch (e) {
        alert(e.toString());
      }
      app.endUndoGroup();
    }

    function runDistribute(axis) {
      var comp = app.project.activeItem;
      if (!comp || comp.selectedLayers.length < 3) return;
      app.beginUndoGroup("Distribute");
      var sel = [];
      for (var i = 0; i < comp.selectedLayers.length; i++)
        sel.push(comp.selectedLayers[i]);
      sel.sort(function (a, b) {
        var ea =
          axis === "H"
            ? getLayerEdge(a, "hCenter")
            : getLayerEdge(a, "vCenter");
        var eb =
          axis === "H"
            ? getLayerEdge(b, "hCenter")
            : getLayerEdge(b, "vCenter");
        return ea - eb;
      });
      var start =
        axis === "H"
          ? getLayerEdge(sel[0], "hCenter")
          : getLayerEdge(sel[0], "vCenter");
      var end =
        axis === "H"
          ? getLayerEdge(sel[sel.length - 1], "hCenter")
          : getLayerEdge(sel[sel.length - 1], "vCenter");
      var step = (end - start) / (sel.length - 1);
      for (var i = 1; i < sel.length - 1; i++) {
        var t = start + step * i;
        var c =
          axis === "H"
            ? getLayerEdge(sel[i], "hCenter")
            : getLayerEdge(sel[i], "vCenter");
        if (axis === "H") shiftLayer(sel[i], t - c, 0);
        else shiftLayer(sel[i], 0, t - c);
      }
      app.endUndoGroup();
    }

    // --- 4. Auto Crop (V44 Logic) ---
    function runAutoCrop() {
      var comp = app.project.activeItem;
      if (!comp || !(comp instanceof CompItem)) return alert("Open Comp!");
      app.beginUndoGroup("Auto Crop");
      try {
        var precompsToCrop = [];
        for (var i = 0; i < comp.selectedLayers.length; i++) {
          var l = comp.selectedLayers[i];
          if (l.source instanceof CompItem) precompsToCrop.push(l);
        }
        if (precompsToCrop.length > 0) {
          for (var j = 0; j < precompsToCrop.length; j++)
            cropExternalPrecomp(precompsToCrop[j]);
        } else {
          cropActiveComp(comp);
        }
      } catch (err) {
        alert("Auto Crop Error: " + err.toString());
      }
      app.endUndoGroup();
    }

    function cropExternalPrecomp(layer) {
      var sourceComp = layer.source;
      var bounds = getCompContentBounds(sourceComp, [], true);
      if (bounds.width === 0) return;
      var newW = Math.max(4, Math.ceil(bounds.width));
      var newH = Math.max(4, Math.ceil(bounds.height));
      sourceComp.width = newW;
      sourceComp.height = newH;
      shiftCompLayers(sourceComp, -bounds.left, -bounds.top);
      var curAnchor = layer.anchorPoint.value;
      var newAnchor = [curAnchor[0] + bounds.left, curAnchor[1] + bounds.top];
      if (curAnchor.length > 2) newAnchor.push(curAnchor[2]);
      layer.anchorPoint.setValue(newAnchor);
    }

    function cropActiveComp(comp) {
      var targetLayers = [];
      if (comp.selectedLayers.length > 0)
        for (var i = 0; i < comp.selectedLayers.length; i++)
          targetLayers.push(comp.selectedLayers[i]);
      var bounds = getCompContentBounds(comp, targetLayers, true);
      if (bounds.width === 0) return alert("No bounds detected");
      comp.width = Math.max(4, Math.ceil(bounds.width));
      comp.height = Math.max(4, Math.ceil(bounds.height));
      shiftCompLayers(comp, -bounds.left, -bounds.top);
    }

    function getCompContentBounds(comp, specificLayers, scanAnimation) {
      var minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      var layersToCheck = specificLayers.length > 0 ? specificLayers : [];
      if (layersToCheck.length === 0)
        for (var i = 1; i <= comp.numLayers; i++)
          layersToCheck.push(comp.layer(i));
      var found = false;
      var duration = comp.duration;
      var step = scanAnimation ? comp.frameDuration * 10 : duration + 1;
      for (var t = 0; t <= duration; t += step) {
        var ct = t > duration ? duration : t;
        for (var i = 0; i < layersToCheck.length; i++) {
          var l = layersToCheck[i];
          if (!l.active && specificLayers.length === 0) continue;
          if (ct < l.inPoint || ct > l.outPoint) continue;
          try {
            var r = l.sourceRectAtTime(ct, false);
            if (r.width === 0) continue;
            var pos = l.property("Position").valueAtTime(ct, false);
            var anc = l.property("Anchor Point").valueAtTime(ct, false);
            var sc = l.property("Scale").valueAtTime(ct, false);
            var sx = sc[0] / 100;
            var sy = sc[1] / 100;
            var left = pos[0] + (r.left - anc[0]) * sx;
            var top = pos[1] + (r.top - anc[1]) * sy;
            var right = left + r.width * sx;
            var bottom = top + r.height * sy;
            if (left < minX) minX = left;
            if (top < minY) minY = top;
            if (right > maxX) maxX = right;
            if (bottom > maxY) maxY = bottom;
            found = true;
          } catch (e) {}
        }
        if (!scanAnimation) break;
      }
      if (!found) return { left: 0, top: 0, width: 0, height: 0 };
      var pad = 2;
      return {
        left: minX - pad,
        top: minY - pad,
        width: maxX - minX + pad * 2,
        height: maxY - minY + pad * 2,
      };
    }

    function shiftCompLayers(comp, x, y) {
      for (var i = 1; i <= comp.numLayers; i++) {
        var l = comp.layer(i);
        if (l.parent == null && !l.locked && l.transform.position) {
          var p = l.transform.position;
          if (p.dimensionsSeparated) {
            if (p.property(0).numKeys > 0)
              for (var k = 1; k <= p.property(0).numKeys; k++)
                p.property(0).setValueAtKey(k, p.property(0).keyValue(k) + x);
            else p.property(0).setValue(p.property(0).value + x);
            if (p.property(1).numKeys > 0)
              for (var k = 1; k <= p.property(1).numKeys; k++)
                p.property(1).setValueAtKey(k, p.property(1).keyValue(k) + y);
            else p.property(1).setValue(p.property(1).value + y);
          } else {
            if (p.numKeys > 0)
              for (var k = 1; k <= p.numKeys; k++) {
                var v = p.keyValue(k);
                p.setValueAtKey(k, [v[0] + x, v[1] + y, v[2]]);
              }
            else {
              var v = p.value;
              p.setValue([v[0] + x, v[1] + y, v[2]]);
            }
          }
        }
      }
    }

    // --- Other Helpers ---
    function getCleanBaseName(n) {
      while (n.match(/^(Null for |Adj for |Solid_for_|Camera for |Light for )/))
        n = n.replace(
          /^(Null for |Adj for |Solid_for_|Camera for |Light for )/g,
          ""
        );
      return n.replace(/(\s\d+)+$/g, "").replace(/^\s+|\s+$/g, "");
    }
    function getUniqueName(c, p) {
      if (c.layer(p) == null) return p;
      var i = 2;
      while (c.layer(p + " " + i) != null) i++;
      return p + " " + i;
    }
    function getTargetLabel(d) {
      var i = colorDropdown.selection.index;
      return i === 0 ? d : i;
    }
    function getQuantity() {
      return parseInt(qtyDropdown.selection.text);
    }
    function addLockedEaseKeys(l, mn) {
      function apply(p) {
        if (!p || p.numKeys > 0) return;
        var k1 = p.addKey(l.inPoint),
          k2 = p.addKey(l.outPoint);
        p.setValueAtKey(k1, p.value);
        p.setValueAtKey(k2, p.value);
        var e = new KeyframeEase(0, 33.33);
        var a =
          p.propertyValueType === PropertyValueType.ThreeD ? [e, e, e] : [e];
        try {
          p.setTemporalEaseAtKey(k1, a, a);
          p.setTemporalEaseAtKey(k2, a, a);
        } catch (z) {}
      }
      if (mn === "Position") {
        var pos = l.transform.position;
        if (pos.dimensionsSeparated) {
          apply(l.transform.xPosition);
          apply(l.transform.yPosition);
          if (l.threeDLayer) apply(l.transform.zPosition);
          return;
        }
      }
      var prop = l.property(mn);
      if (!prop) prop = l.property("ADBE Transform Group").property(mn);
      if (prop) apply(prop);
    }

    // --- Main Functions ---
    function createTextLayer(f, t, s) {
      var c = app.project.activeItem;
      if (!c) return;
      app.beginUndoGroup("Txt");
      var l = c.layers.addText(t);
      var p = l.property("Source Text").value;
      p.font = f;
      p.fontSize = s;
      p.applyFill = true;
      p.fillColor = [1, 1, 1];
      p.justification = ParagraphJustification.CENTER_JUSTIFY;
      l.property("Source Text").setValue(p);
      var r = l.sourceRectAtTime(c.time, false);
      l.property("Anchor Point").setValue([
        r.left + r.width / 2,
        r.top + r.height / 2,
      ]);
      l.property("Position").setValue([c.width / 2, c.height / 2]);
      l.property("Effects")
        .addProperty("ADBE Fill")
        .property("Color")
        .setValue([1, 1, 1]);
      l.selected = true;
      app.endUndoGroup();
    }
    function addFx(n) {
      var c = app.project.activeItem;
      if (!c) return;
      app.beginUndoGroup("Fx " + n);
      for (var i = 0; i < c.selectedLayers.length; i++) {
        var l = c.selectedLayers[i];
        var fx = l.property("Effects");
        if (n === "Clean") {
          for (var j = fx.numProperties; j >= 1; j--)
            if (fx.property(j).matchName.match(/Fill|Ramp|TextBox/))
              fx.property(j).remove();
          continue;
        }
        for (var j = fx.numProperties; j >= 1; j--)
          if (fx.property(j).matchName.match(/Fill|Ramp/))
            fx.property(j).remove();
        if (n === "Fill")
          fx.addProperty("ADBE Fill").property("Color").setValue([1, 1, 1]);
        if (n === "Gradient") fx.addProperty("ADBE Ramp");
        if (n === "Box") {
          for (var j = fx.numProperties; j >= 1; j--)
            if (fx.property(j).name === "TextBox 2") fx.property(j).remove();
          try {
            var b = fx.addProperty("TextBox 2");
            if (b.property("Color")) b.property("Color").setValue([0, 0, 0]);
          } catch (e) {}
        }
      }
      app.endUndoGroup();
    }
    function smartPrecompose(sep) {
      var c = app.project.activeItem;
      if (!c || c.selectedLayers.length === 0) return;
      app.beginUndoGroup("Precomp");
      var sel = [];
      for (var i = 0; i < c.selectedLayers.length; i++)
        sel.push(c.selectedLayers[i]);
      sel.sort(function (a, b) {
        return b.index - a.index;
      });
      if (sep) {
        var cnt = 1;
        for (var i = 0; i < sel.length; i++) {
          var l = sel[i];
          var nc = c.layers.precompose(
            [l.index],
            getUniqueName(c, cnt + "_marcy_" + l.name),
            true
          );
          var dur = l.outPoint - l.inPoint;
          nc.duration = dur;
          nc.layer(1).startTime -= l.inPoint;
          c.selectedLayers[0].startTime = l.inPoint;
          c.selectedLayers[0].outPoint = l.inPoint + dur;
          cnt++;
        }
      } else {
        var idxs = [];
        var min = 99999,
          max = -99999;
        for (var i = 0; i < sel.length; i++) {
          idxs.push(sel[i].index);
          if (sel[i].inPoint < min) min = sel[i].inPoint;
          if (sel[i].outPoint > max) max = sel[i].outPoint;
        }
        var nc = c.layers.precompose(
          idxs,
          getUniqueName(c, "1_marcy_" + sel[0].name),
          true
        );
        nc.duration = max - min;
        for (var j = 1; j <= nc.numLayers; j++) nc.layer(j).startTime -= min;
        c.selectedLayers[0].startTime = min;
        c.selectedLayers[0].outPoint = max;
      }
      app.endUndoGroup();
    }
    function toggleSepXY() {
      var c = app.project.activeItem;
      if (!c) return;
      app.beginUndoGroup("Sep");
      for (var i = 0; i < c.selectedLayers.length; i++) {
        var p = c.selectedLayers[i].transform.position;
        if (p.dimensionsSeparated !== undefined)
          p.dimensionsSeparated = !p.dimensionsSeparated;
      }
      app.endUndoGroup();
    }
    function addNullAndParent() {
      var c = app.project.activeItem;
      if (!c) return;
      app.beginUndoGroup("Null");
      var sel = c.selectedLayers;
      var is3D = false,
        min = 99999,
        max = -99999;
      if (sel.length > 0) {
        for (var i = 0; i < sel.length; i++) {
          if (sel[i].inPoint < min) min = sel[i].inPoint;
          if (sel[i].outPoint > max) max = sel[i].outPoint;
          if (sel[i].threeDLayer) is3D = true;
        }
        var cnt = getQuantity();
        for (var q = 0; q < cnt; q++) {
          var n = c.layers.addNull();
          n.inPoint = min;
          n.outPoint = max;
          n.label = getTargetLabel(1);
          if (is3D) n.threeDLayer = true;
          n.name = getUniqueName(
            c,
            "Null for " + getCleanBaseName(sel[0].name)
          );
          for (var i = 0; i < sel.length; i++) sel[i].parent = n;
          addLockedEaseKeys(n, "Scale");
          addLockedEaseKeys(n, "Position");
          addLockedEaseKeys(n, "Rotation");
          n.selected = true;
        }
        for (var i = 0; i < sel.length; i++) sel[i].selected = false;
      } else {
        var n = c.layers.addNull();
        n.source.width = c.width;
        n.source.height = c.height;
        n.label = getTargetLabel(1);
        n.name = getUniqueName(c, "Null for " + c.name);
      }
      app.endUndoGroup();
    }
    /* AdjustmentLayer */
    function addAdjustmentLayer() {
      var c = app.project.activeItem;
      if (!c) return;

      app.beginUndoGroup("Adj");
      var qty = getQuantity();
      var targets = getSelectedTargets(c);

      if (targets.length > 0) {
        for (var j = 0; j < targets.length; j++) {
          var target = targets[j];
          var start = target.inPoint;
          var end = target.outPoint;

          var insertionRef = target;

          for (var cnt = 0; cnt < qty; cnt++) {
            var layer = c.layers.addSolid(
              [1, 1, 1],
              "Adjustment Layer",
              c.width,
              c.height,
              1
            );
            layer.adjustmentLayer = true;
            layer.label = getTargetLabel(8);
            layer.inPoint = start;
            layer.outPoint = end;

            layer.moveBefore(insertionRef); // 插在 refLayer（或上一個新建 adj）上方
            insertionRef = layer;

            layer.name = getUniqueName(
              c,
              "Adj for " + getCleanBaseName(target.name)
            );
          }
        }
      } else {
        for (var j = 0; j < qty; j++) {
          var layer = c.layers.addSolid(
            [1, 1, 1],
            "Adjustment Layer",
            c.width,
            c.height,
            1
          );
          layer.adjustmentLayer = true;
          layer.label = getTargetLabel(8);
          layer.inPoint = 0;
          layer.outPoint = c.duration;
          layer.name = getUniqueName(c, "Adj for " + c.name);
        }
      }

      app.endUndoGroup();
    }
    /* BlackSolid */
    function addSolidBlack() {
      var c = app.project.activeItem;
      if (!c) return;
      app.beginUndoGroup("Solid");

      var qty = getQuantity();
      var targets = getSelectedTargets(c);

      if (targets.length > 0) {
        for (var j = 0; j < targets.length; j++) {
          var target = targets[j];
          var start = target.inPoint;
          var end = target.outPoint;

          var insertionRef = target;

          for (var cnt = 0; cnt < qty; cnt++) {
            var layer = c.layers.addSolid(
              [0, 0, 0],
              "Black Solid",
              c.width,
              c.height,
              1
            );
            layer.label = getTargetLabel(0);
            layer.inPoint = start;
            layer.outPoint = end;
            layer.position.setValue(target.position.value);

            layer.moveBefore(insertionRef); // 插在 refLayer（或上一個新建 adj）上方
            insertionRef = layer;

            layer.name = getUniqueName(
              c,
              "Solid_for_" + getCleanBaseName(target.name)
            );
          }
        }
      } else {
        for (var j = 0; j < qty; j++) {
          var layer = c.layers.addSolid(
            [0, 0, 0],
            "Black Solid",
            c.width,
            c.height,
            1
          );
          layer.label = getTargetLabel(0);
          layer.inPoint = 0;
          layer.outPoint = c.duration;
          layer.name = getUniqueName(c, "Solid_for_" + c.name);
        }
      }
      app.endUndoGroup();
    }
    /* Camera */
    function addCamera() {
      var comp = app.project.activeItem;
      if (!comp) return;

      app.beginUndoGroup("Cam");
      try {
        var targets = getSelectedTargets(comp);
        var qty = getQuantity();

        if (targets.length > 0) {
          for (var j = 0; j < targets.length; j++) {
            var target = targets[j];
            var start = target.inPoint;
            var end = target.outPoint;
            var insertionRef = target;

            for (var cnt = 0; cnt < qty; cnt++) {
              var camera = createLayer("Camera", comp);

              camera.inPoint = start;
              camera.outPoint = end;

              camera.moveBefore(insertionRef);
              insertionRef = camera;
            }
          }
        } else {
          for (var k = 0; k < qty; k++) {
            var camera = createLayer("Camera", comp);

            camera.inPoint = 0;
            camera.outPoint = comp.duration;
          }
        }
      } catch (err) {
      } finally {
        app.endUndoGroup();
      }
    }
    /* Light */
    function addLight() {
      var comp = app.project.activeItem;
      if (!comp) return;

      app.beginUndoGroup("Light");
      try {
        var targets = getSelectedTargets(comp);
        var qty = getQuantity();

        if (targets.length > 0) {
          for (var j = 0; j < targets.length; j++) {
            var target = targets[j];
            var start = target.inPoint;
            var end = target.outPoint;
            var insertionRef = target;

            for (var cnt = 0; cnt < qty; cnt++) {
              var light = createLayer("Light", comp);

              light.inPoint = start;
              light.outPoint = end;
              light.moveBefore(insertionRef);
              insertionRef = light;
            }
          }
        } else {
          for (var k = 0; k < qty; k++) {
            var light = createLayer("Light", comp);

            light.inPoint = 0;
            light.outPoint = comp.duration;
          }
        }
      } catch (err) {
        alert(err.toString());
      } finally {
        app.endUndoGroup();
      }
    }

    function getSelectedTargets(comp) {
      var sel = comp.selectedLayers;
      var targets = [];
      if (!sel) return targets;

      for (var i = 0; i < sel.length; i++) targets.push(sel[i]);

      targets.sort(function (a, b) {
        return a.index - b.index;
      });

      return targets;
    }

    function createLayer(mode, comp) {
      var layer;
      switch (mode) {
        case "Camera":
          layer = comp.layers.addCamera(getUniqueName(comp, "Camera"), [
            comp.width / 2,
            comp.height / 2,
          ]);
          break;
        case "Solid":
          layer = comp.layers.addSolid(
            [0, 0, 0],
            "Black Solid",
            comp.width,
            comp.height,
            1
          );
          break;
        case "Adjustment Layer":
          layer = comp.layers.addSolid(
            [1, 1, 1],
            "Adjustment Layer",
            comp.width,
            comp.height,
            1
          );
          break;
        case "Light":
          layer = comp.layers.addLight(getUniqueName(comp, "Light"), [
            comp.width / 2,
            comp.height / 2,
          ]);
          break;
      }
      return layer;
    }

    // --- Event Wiring ---
    btnEN.onClick = function () {
      createTextLayer("BebasNeue-Regular", "EXAMPLE MARCY", 100);
    };
    btnJP.onClick = function () {
      createTextLayer("VDL-LogoJrBlack", "文字見本", 100);
    };
    btnSUB.onClick = function () {
      createTextLayer("Arial-ItalicMT", "example marcy", 80);
    };
    btnFill.onClick = function () {
      addFx("Fill");
    };
    btnGradient.onClick = function () {
      addFx("Gradient");
    };
    btnBox.onClick = function () {
      addFx("Box");
    };
    btnClean.onClick = function () {
      addFx("Clean");
    };

    btnAlignLeft.onClick = function () {
      runAlign("left");
    };
    btnAlignHCenter.onClick = function () {
      runAlign("hCenter");
    };
    btnAlignRight.onClick = function () {
      runAlign("right");
    };
    btnAlignTop.onClick = function () {
      runAlign("top");
    };
    btnAlignVCenter.onClick = function () {
      runAlign("vCenter");
    };
    btnAlignBottom.onClick = function () {
      runAlign("bottom");
    };
    btnDistH.onClick = function () {
      runDistribute("H");
    };
    btnDistV.onClick = function () {
      runDistribute("V");
    };

    btnTL.onClick = function () {
      setAnchor("TL");
    };
    btnTM.onClick = function () {
      setAnchor("TM");
    };
    btnTR.onClick = function () {
      setAnchor("TR");
    };
    btnML.onClick = function () {
      setAnchor("ML");
    };
    btnMM.onClick = function () {
      setAnchor("MM");
    };
    btnMR.onClick = function () {
      setAnchor("MR");
    };
    btnBL.onClick = function () {
      setAnchor("BL");
    };
    btnBM.onClick = function () {
      setAnchor("BM");
    };
    btnBR.onClick = function () {
      setAnchor("BR");
    };

    btnParaLeft.onClick = function () {
      setParagraph(ParagraphJustification.LEFT_JUSTIFY);
    };
    btnParaCenter.onClick = function () {
      setParagraph(ParagraphJustification.CENTER_JUSTIFY);
    };
    btnParaRight.onClick = function () {
      setParagraph(ParagraphJustification.RIGHT_JUSTIFY);
    };

    btnPrecomp.onClick = function () {
      smartPrecompose(chkSeparate.value);
    };
    btnNull.onClick = function () {
      addNullAndParent();
    };
    btnAdj.onClick = function () {
      addAdjustmentLayer();
    };
    btnSep.onClick = function () {
      toggleSepXY();
    };
    btnSolid.onClick = function () {
      addSolidBlack();
    };
    btnCamera.onClick = function () {
      addCamera();
    };
    btnLight.onClick = function () {
      addLight();
    };
    btnCrop.onClick = function () {
      runAutoCrop();
    };

    win.onResizing = win.onResize = function () {
      this.layout.resize();
    };
    if (win instanceof Window) {
      win.center();
      win.show();
    } else {
      win.layout.layout(true);
    }
  }
  buildUI(this);
}

// ben ben ben
