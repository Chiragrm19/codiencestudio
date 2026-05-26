// Mock data generator taking complex inputs into account

exports.generateDesign = (req, res) => {
  const payload = req.body;
  const prompt = payload.prompt || '';
  const normalizedPrompt = prompt.toLowerCase();
  
  let baseDesign;
  
  if (normalizedPrompt.includes('ecommerce') || normalizedPrompt.includes('shop') || normalizedPrompt.includes('store')) {
    baseDesign = getEcommerceDesign();
  } else if (normalizedPrompt.includes('chat') || normalizedPrompt.includes('messaging') || normalizedPrompt.includes('realtime')) {
    baseDesign = getChatDesign();
  } else if (normalizedPrompt.includes('social') || normalizedPrompt.includes('feed') || normalizedPrompt.includes('post')) {
    baseDesign = getSocialDesign();
  } else {
    baseDesign = getGenericDesign();
  }

  // Enhance design with constraints
  const finalDesign = {
    ...baseDesign,
    name: payload.projectName || baseDesign.name,
    sdlcModel: payload.sdlcModel || "Agile",
    targetCustomers: payload.targetCustomers || "General Market",
    businessGoals: payload.businessGoals || "Standard operational goals",
    // Adjust workflow based on SDLC
    workflow: getMethodologyWorkflow(payload.sdlcModel, baseDesign.workflow)
  };
  
  // Conditionally add components based on user tick-boxes if they aren't already there
  if (payload.selectedComponents) {
    if (payload.selectedComponents.auth && !finalDesign.components.find(c => c.name.includes("Auth"))) {
      finalDesign.components.push({ name: 'Authentication Service', technology: 'Keycloak / Auth0', purpose: 'Centralized User Identity Management' });
    }
    if (payload.selectedComponents.payment && !finalDesign.components.find(c => c.name.includes("Payment"))) {
      finalDesign.components.push({ name: 'Payment Gateway', technology: 'Stripe API', purpose: 'Process transactions securely' });
    }
  }

  setTimeout(() => {
    res.json(finalDesign);
  }, 1800);
};

function getMethodologyWorkflow(sdlc, originalFlow) {
  if (sdlc === "Waterfall") {
    // Wrap the flow in a waterfall phase
    return `flowchart TD
  subgraph Requirements Phase
    req[Gather Business & Customer Specs]
  end
  subgraph Design Phase
    des[Architect Data Models & APIs]
  end
  subgraph Implementation Phase
    ${originalFlow.replace('flowchart TD\n', '').trim()}
  end
  req --> des --> Implementation Phase`;
  }
  if (sdlc === "Agile") {
    return `flowchart LR
  subgraph CI/CD Pipeline
    git[Git Push] --> build[Docker Build] --> test[Automated Tests] --> deploy[Kubernetes Deploy]
  end
  subgraph System Operations
    ${originalFlow.replace('flowchart TD\n', '').trim()}
  end
  deploy -.-> System Operations`;
  }
  
  return originalFlow;
}

function getEcommerceDesign() {
  return {
    name: 'E-commerce Platform Architecture',
    overview: 'A scalable e-commerce microservices architecture with a dedicated product catalog, user sessions, and payment processing.',
    workflow: `flowchart TD
  Client[Web / Mobile Client] --> API_Gateway[API Gateway]
  API_Gateway --> Auth[Auth Service]
  API_Gateway --> Cart[Shopping Cart Service]
  API_Gateway --> Catalog[Product Catalog Service]`,
    architecture: `graph LR
  subgraph Data Tier
    DB[(PostgreSQL)]
    Cache[(Redis)]
  end
  App --> DB
  App --> Cache`,
    components: [
      { name: 'API Gateway', technology: 'Kong', purpose: 'Route client requests.' },
      { name: 'Shopping Cart', technology: 'Node.js', purpose: 'Manage temporary user cart states.' },
      { name: 'Database', technology: 'PostgreSQL', purpose: 'Persistent storage.' }
    ],
    apiEndpoints: [
      { method: 'GET', path: '/api/products', description: 'Retrieve products.' },
      { method: 'POST', path: '/api/cart', description: 'Add item to user cart.' }
    ],
    estimatedCost: '$120 - $250 / month'
  };
}

// Additional stubs for brevity
function getChatDesign() { return getEcommerceDesign(); }
function getSocialDesign() { return getEcommerceDesign(); }
function getGenericDesign() { return getEcommerceDesign(); }
